import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  imports: [NgClass],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class Tags {
  @Input() allTags: string[] = []
  @Input() tagType: string = ""
  @Input() links: string[] = []
  @Input() classNames: string = ""
}
