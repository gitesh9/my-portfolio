import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-status',
  imports: [NgClass],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
  @Input() statusText: string = '';
  @Input() background: string = '';
}
