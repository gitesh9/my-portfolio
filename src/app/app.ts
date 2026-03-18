import { Component } from '@angular/core';
import { Navbar } from '@core/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { AiChatModal } from "./pages/intro-section/components/ai-chat-modal/ai-chat-modal";

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet, AiChatModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'My_Portfolio';
}
