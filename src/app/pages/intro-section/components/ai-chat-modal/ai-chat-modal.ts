import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from "../status/status";

@Component({
  selector: 'app-ai-chat-modal',
  imports: [CommonModule, Status],
  templateUrl: './ai-chat-modal.html',
  styleUrl: './ai-chat-modal.css',
})
export class AiChatModal {
  isOpen = signal(false);

  constructor() {
    effect(() => {
      const isModalOpen = this.isOpen();
      if (isModalOpen && window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  closeChat() {
    this.isOpen.set(false);
  }
}
