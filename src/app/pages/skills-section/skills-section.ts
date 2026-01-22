import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Heading } from "@app/shared/components/heading/heading";

@Component({
  selector: 'app-skills-section',
  imports: [RouterLink, SectionWrapper, Heading],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.css',
})
export class SkillsSection {

}
