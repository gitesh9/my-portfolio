import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-wrapper',
  imports: [CommonModule],
  templateUrl: './section-wrapper.html',
  styleUrl: './section-wrapper.css',
})
export class SectionWrapper {
  @Input() pageId: string = '';
  @Input() classes: string | string[] = '';
}
