import { Component, Input } from '@angular/core';
import { Heading } from "@app/shared/components/heading/heading";

@Component({
  selector: 'app-contact-header-section',
  imports: [Heading],
  templateUrl: './contact-header.html',
  styleUrl: './contact-header.css',
})
export class ContactHeaderSection {
  @Input() email!:string;
}
