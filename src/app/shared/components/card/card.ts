import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() classNames: string = "";
  @Input() id: string | number = "card1"
  @Output() hoverChange = new EventEmitter<boolean>();

  onEnter() {
    this.hoverChange.emit(true);
  }

  onLeave() {
    this.hoverChange.emit(false);
  }
}
