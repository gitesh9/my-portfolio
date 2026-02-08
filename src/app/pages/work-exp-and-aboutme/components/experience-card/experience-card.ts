import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Tags } from '@app/shared/components/tags/tags';
import { WorkExperience } from 'assets/user_data';

@Component({
  selector: 'app-experience-card',
  imports: [CommonModule, Tags],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
})
export class ExperienceCard {
  @Input() company!:WorkExperience;
}
