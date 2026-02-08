import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '@app/shared/components/card/card';
import { ExperienceCard } from '../experience-card/experience-card';
import { WorkExperience } from 'assets/user_data';

@Component({
  selector: 'app-timeline-item',
  imports: [CommonModule, Card, ExperienceCard],
  templateUrl: './timeline-item.html',
  styleUrl: './timeline-item.css',
})
export class TimelineItem {
  @Input() index!: number;
  @Input() companyDetails!: WorkExperience;

}
