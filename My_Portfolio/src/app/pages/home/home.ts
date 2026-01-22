import { Component } from '@angular/core';
import { IntroSection } from '../intro-section/intro-section';
import { ProjectSection } from '../project-section/project-section';
import { SkillsSection } from '../skills-section/skills-section';
import { WorkExpAndAboutme } from '../work-exp-and-aboutme/work-exp-and-aboutme';
import { Testimonials } from '../testimonials/testimonials';
import { ContactMe } from '../contact-me/contact-me';

@Component({
  selector: 'app-home',
  imports: [IntroSection, ProjectSection, SkillsSection, WorkExpAndAboutme, Testimonials, ContactMe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
