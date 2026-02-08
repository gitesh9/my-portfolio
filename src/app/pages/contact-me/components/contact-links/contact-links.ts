import { Component, Input } from '@angular/core';
import { Tags } from '@app/shared/components/tags/tags';

@Component({
  selector: 'app-contact-links',
  imports: [Tags],
  templateUrl: './contact-links.html',
  styleUrl: './contact-links.css',
})
export class ContactLinks {
  @Input() connectingTags!: { name: string; link: string }[];
}
