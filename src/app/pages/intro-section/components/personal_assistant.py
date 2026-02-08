"""
portfolio_agent.py

A minimal, production-lean "portfolio agent" that answers questions about you
based ONLY on the PDF/JSON you provide (RAG), with optional tool-calling to:
- save a lead (email/name)
- log unknown questions

Features
- PDF + JSON ingestion
- Chunking + embeddings + in-memory vector search (RAG)
- Agent loop with OpenAI tool calling (no infinite loops)
- Gradio chat UI
- SQLite persistence for leads + unknown questions

Setup
1) pip install openai pypdf gradio numpy python-dotenv
2) Put your files somewhere, e.g.:
   - data/profile.pdf
   - data/profile.json
3) Create a .env with:
   OPENAI_API_KEY=...
   (optional) OPENAI_MODEL=gpt-4.1-mini (or your choice)
4) Run:
   python portfolio_agent.py

Notes
- This code uses OpenAI's "chat.completions" + embeddings via the OpenAI python SDK (1.x style).
- If your org uses the newer "Responses API", the structure is the same; you'd swap the call site.
"""

from __future__ import annotations

import os
import re
import json
import time
import sqlite3
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
import gradio as gr
from dotenv import load_dotenv
from pypdf import PdfReader
from openai import OpenAI


# =========================
# Config
# =========================

load_dotenv(override=True)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("Missing OPENAI_API_KEY in environment or .env")

MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")  # choose what you have access to
EMBED_MODEL = os.getenv("OPENAI_EMBED_MODEL", "text-embedding-3-small")

# RAG params
CHUNK_CHARS = int(os.getenv("CHUNK_CHARS", "1200"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "200"))
TOP_K = int(os.getenv("TOP_K", "6"))

# Agent loop safety
MAX_TOOL_STEPS = int(os.getenv("MAX_TOOL_STEPS", "6"))

DB_PATH = os.getenv("AGENT_DB_PATH", "portfolio_agent.db")

# Data sources (edit these paths)
PDF_PATH = os.getenv("PROFILE_PDF_PATH", "data/profile.pdf")
JSON_PATH = os.getenv("PROFILE_JSON_PATH", "data/profile.json")


client = OpenAI(api_key=OPENAI_API_KEY)


# =========================
# Utilities
# =========================

def normalize_whitespace(s: str) -> str:
    s = s.replace("\u00a0", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def read_pdf_text(path: str) -> str:
    if not os.path.exists(path):
        return ""
    reader = PdfReader(path)
    parts = []
    for page in reader.pages:
        txt = page.extract_text() or ""
        txt = txt.strip()
        if txt:
            parts.append(txt)
    return normalize_whitespace("\n\n".join(parts))


def read_json_text(path: str) -> str:
    if not os.path.exists(path):
        return ""
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    # Make JSON readable to the model but still structured-ish
    return normalize_whitespace(json.dumps(data, ensure_ascii=False, indent=2))


def chunk_text(text: str, chunk_chars: int = CHUNK_CHARS, overlap: int = CHUNK_OVERLAP) -> List[str]:
    """
    Simple char-based chunking. For portfolios, this is usually good enough.
    """
    text = text.strip()
    if not text:
        return []
    chunks = []
    i = 0
    while i < len(text):
        j = min(len(text), i + chunk_chars)
        chunk = text[i:j].strip()
        if chunk:
            chunks.append(chunk)
        if j == len(text):
            break
        i = max(0, j - overlap)
    return chunks


def embed_texts(texts: List[str]) -> np.ndarray:
    """
    Returns embeddings as a float32 numpy array: shape (n, d)
    """
    if not texts:
        return np.zeros((0, 0), dtype=np.float32)

    # OpenAI embeddings endpoint accepts a list of inputs
    resp = client.embeddings.create(
        model=EMBED_MODEL,
        input=texts
    )
    vecs = [np.array(e.embedding, dtype=np.float32) for e in resp.data]
    return np.vstack(vecs)


def cosine_sim_matrix(query_vec: np.ndarray, doc_vecs: np.ndarray) -> np.ndarray:
    """
    query_vec: (d,)
    doc_vecs: (n, d)
    returns: (n,) similarities
    """
    if doc_vecs.size == 0:
        return np.array([], dtype=np.float32)

    q = query_vec.astype(np.float32)
    D = doc_vecs.astype(np.float32)

    q_norm = np.linalg.norm(q) + 1e-8
    d_norms = np.linalg.norm(D, axis=1) + 1e-8

    sims = (D @ q) / (d_norms * q_norm)
    return sims.astype(np.float32)


# =========================
# Persistence (SQLite)
# =========================

def init_db(db_path: str = DB_PATH) -> None:
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        name TEXT,
        notes TEXT,
        created_at_utc INTEGER NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS unknown_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        created_at_utc INTEGER NOT NULL
    )
    """)

    con.commit()
    con.close()


def save_lead(email: str, name: Optional[str] = None, notes: Optional[str] = None) -> Dict[str, Any]:
    email = (email or "").strip()
    if not email:
        return {"ok": False, "error": "email is required"}

    # Very light validation; you can tighten this
    if "@" not in email or "." not in email.split("@")[-1]:
        return {"ok": False, "error": "email doesn't look valid"}

    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute(
        "INSERT INTO leads(email, name, notes, created_at_utc) VALUES (?, ?, ?, ?)",
        (email, (name or "").strip() or None, (notes or "").strip() or None, int(time.time()))
    )
    con.commit()
    con.close()
    return {"ok": True, "saved": {"email": email, "name": name, "notes": notes}}


def log_unknown_question(question: str) -> Dict[str, Any]:
    q = (question or "").strip()
    if not q:
        return {"ok": False, "error": "question is required"}

    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute(
        "INSERT INTO unknown_questions(question, created_at_utc) VALUES (?, ?)",
        (q, int(time.time()))
    )
    con.commit()
    con.close()
    return {"ok": True, "logged": {"question": q}}


# =========================
# RAG Index
# =========================

@dataclass
class RagIndex:
    chunks: List[str]
    embeddings: np.ndarray  # (n, d)

    @classmethod
    def build_from_sources(cls, pdf_path: str, json_path: str) -> "RagIndex":
        pdf_text = read_pdf_text(pdf_path)
        json_text = read_json_text(json_path)

        combined = []
        if pdf_text:
            combined.append("SOURCE: PDF\n" + pdf_text)
        if json_text:
            combined.append("SOURCE: JSON\n" + json_text)

        full_text = normalize_whitespace("\n\n".join(combined))
        chunks = chunk_text(full_text)

        if not chunks:
            # Keep it non-empty to avoid weird model behavior
            chunks = ["No profile content loaded. Please provide a PDF/JSON."]

        embs = embed_texts(chunks)
        return cls(chunks=chunks, embeddings=embs)

    def retrieve(self, query: str, top_k: int = TOP_K) -> List[Tuple[int, float, str]]:
        query = (query or "").strip()
        if not query:
            return []

        q_emb = embed_texts([query])[0]
        sims = cosine_sim_matrix(q_emb, self.embeddings)
        if sims.size == 0:
            return []

        k = min(top_k, len(self.chunks))
        idxs = np.argpartition(-sims, k - 1)[:k]
        idxs = idxs[np.argsort(-sims[idxs])]

        return [(int(i), float(sims[i]), self.chunks[int(i)]) for i in idxs]


# =========================
# Agent (LLM + tool calling)
# =========================

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "save_lead",
            "description": "Save a user's contact details (email required) when they express interest in hiring/collaborating.",
            "parameters": {
                "type": "object",
                "properties": {
                    "email": {"type": "string", "description": "User's email address"},
                    "name": {"type": "string", "description": "User's name (optional)"},
                    "notes": {"type": "string", "description": "Any notes about what they want (optional)"}
                },
                "required": ["email"],
                "additionalProperties": False
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "log_unknown_question",
            "description": "Log a question the assistant cannot answer from the provided PDF/JSON.",
            "parameters": {
                "type": "object",
                "properties": {
                    "question": {"type": "string", "description": "The user question that couldn't be answered"}
                },
                "required": ["question"],
                "additionalProperties": False
            }
        }
    }
]


def tool_dispatch(name: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if name == "save_lead":
        return save_lead(
            email=args.get("email", ""),
            name=args.get("name"),
            notes=args.get("notes")
        )
    if name == "log_unknown_question":
        return log_unknown_question(
            question=args.get("question", "")
        )
    return {"ok": False, "error": f"Unknown tool: {name}"}


def build_system_prompt() -> str:
    return normalize_whitespace("""
You are a portfolio assistant for the owner of this website (the "Owner"). although you must answer the user as the Owner.
You MUST answer using ONLY the information provided in the retrieved CONTEXT snippets.
If the answer is not in the CONTEXT, say you don't have that information and offer what you *can* do:
- ask a clarifying question,
- or suggest the user share updated PDF/JSON.
If the user asks something you cannot answer from CONTEXT, call log_unknown_question with the question.

If the user expresses interest in hiring/collaboration and provides an email, call save_lead.
If they want to be contacted but haven't provided an email, ask for it.

Style:
- Friendly, concise, professional.
- Use bullet points where helpful.
- Do not invent facts.
- Do not answer as yourself, answer as the Owner.
- Do not say "As the Owner" or "As the portfolio assistant" or anything like that.
- Do not say "I'm the portfolio assistant" or anything like that.
- Do not say "I'm the owner of the website" or anything like that.
- do not say as per information provided and answer as if you are being hired.

""")


def build_context_block(retrieved: List[Tuple[int, float, str]]) -> str:
    if not retrieved:
        return "CONTEXT:\n(No relevant context retrieved. If files are empty, ask user to provide PDF/JSON.)"
    lines = ["CONTEXT (retrieved from the Owner's PDF/JSON):"]
    for idx, score, chunk in retrieved:
        # Keep chunks readable and separated; you can also truncate here if needed
        lines.append(f"\n[Chunk {idx} | score={score:.3f}]\n{chunk}")
    return "\n".join(lines)


def agent_chat(rag: RagIndex, user_message: str, history: List[Dict[str, str]]) -> str:
    """
    history: list of {"role": "user"/"assistant", "content": "..."}
    """
    retrieved = rag.retrieve(user_message, top_k=TOP_K)
    context_block = build_context_block(retrieved)

    messages = [{"role": "system", "content": build_system_prompt()}]

    # Add the RAG context as a system message *after* instructions to keep separation clean
    messages.append({"role": "system", "content": context_block})

    # Add conversation history
    for h in history[-12:]:  # keep recent turns; adjust as you like
        if h["role"] in ("user", "assistant"):
            messages.append({"role": h["role"], "content": h["content"]})

    # Add current user message
    messages.append({"role": "user", "content": user_message})

    # Agent loop: allow model to call tools, then continue
    steps = 0
    final_text = None

    while steps < MAX_TOOL_STEPS:
        steps += 1
        resp = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
            temperature=0.2,
        )

        msg = resp.choices[0].message

        # If the model returns tool calls, execute them and provide results back
        if getattr(msg, "tool_calls", None):
            messages.append({
                "role": "assistant",
                "content": msg.content or "",
                "tool_calls": [tc.model_dump() for tc in msg.tool_calls]
            })

            for tc in msg.tool_calls:
                tool_name = tc.function.name
                try:
                    tool_args = json.loads(tc.function.arguments or "{}")
                except Exception:
                    tool_args = {}

                result = tool_dispatch(tool_name, tool_args)

                messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": json.dumps(result, ensure_ascii=False)
                })

            continue

        # No tool calls -> final answer
        final_text = msg.content or ""
        break

    if final_text is None:
        # Safety fallback if tool loop didn't terminate
        final_text = "I’m having trouble completing that request right now. Could you rephrase your question?"

    return final_text.strip()


# =========================
# Gradio App
# =========================

def build_rag_index() -> RagIndex:
    rag = RagIndex.build_from_sources(PDF_PATH, JSON_PATH)
    return rag


def gradio_chat_fn(user_message: str, state: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
    rag: RagIndex = state["rag"]
    history: List[Dict[str, str]] = state["history"]

    answer = agent_chat(rag, user_message, history)

    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": answer})
    state["history"] = history
    return answer, state


def make_app():
    init_db(DB_PATH)
    rag = build_rag_index()

    with gr.Blocks(title="Portfolio Agent") as demo:
        gr.Markdown("# Portfolio Agent\nAsk questions about the Owner based on their PDF/JSON.")
        chatbot = gr.Chatbot(height=420)

        state = gr.State({"rag": rag, "history": []})

        with gr.Row():
            msg = gr.Textbox(label="Your message", placeholder="Ask about experience, projects, skills, etc...")
            send = gr.Button("Send")

        def _send(user_text, st):
            answer, st = gradio_chat_fn(user_text, st)
            # update chatbot display from st["history"]
            return st["history"], "", st

        send.click(_send, inputs=[msg, state], outputs=[chatbot, msg, state])
        msg.submit(_send, inputs=[msg, state], outputs=[chatbot, msg, state])

        with gr.Accordion("Admin", open=False):
            gr.Markdown(
                f"- Loaded PDF: `{PDF_PATH}`\n"
                f"- Loaded JSON: `{JSON_PATH}`\n"
                f"- Model: `{MODEL}` | Embed: `{EMBED_MODEL}`\n"
                f"- DB: `{DB_PATH}`"
            )
            rebuild = gr.Button("Rebuild Index (reload files)")
            def _rebuild(st):
                st["rag"] = build_rag_index()
                return st
            rebuild.click(_rebuild, inputs=[state], outputs=[state])

    return demo


if __name__ == "__main__":
    app = make_app()
    app.launch(server_name="127.0.0.1", server_port=7860, share=True)
