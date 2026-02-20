import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-chat-modal',
  imports: [CommonModule],
  templateUrl: './ai-chat-modal.html',
  styleUrl: './ai-chat-modal.css',
})
export class AiChatModal {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
