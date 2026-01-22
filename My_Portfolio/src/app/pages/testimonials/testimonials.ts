import { Component } from '@angular/core';
import { RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Card } from "@app/shared/components/card/card";

@Component({
  selector: 'app-testimonials',
  imports: [RouterLink, SectionWrapper, Heading, Card],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  testimonial = true;
}
