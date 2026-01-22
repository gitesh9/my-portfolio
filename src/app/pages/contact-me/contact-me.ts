import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Heading } from "@app/shared/components/heading/heading";
import { Tags } from "@app/shared/components/tags/tags";

@Component({
  selector: 'app-contact-me',
  imports: [RouterLink, SectionWrapper, Heading, Tags],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {

}
