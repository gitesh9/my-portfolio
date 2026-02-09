import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
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

  constructor(private el: ElementRef){}

  ngAfterViewInit(): void {
    const timelineCards = this.el.nativeElement.querySelectorAll(".timeline-item");
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target as HTMLElement;
        setTimeout(() => {
          card.classList.add('visible');
        }, 150);
        observer.disconnect();
      }})
    },{threshold:0.2});
    timelineCards.forEach((card:Element)=>
      observer.observe(card)
    )
  }
}
