import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Tags } from "@app/shared/components/tags/tags";
import { Card } from "@app/shared/components/card/card";

@Component({
  selector: 'app-project-section',
  imports: [CommonModule, RouterLink, SectionWrapper, Heading, Tags, Card],
  templateUrl: './project-section.html',
  styleUrl: './project-section.css',
})
export class ProjectSection {
  visibleItems: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // Simulate loading items with a delay for animation effect
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    const heading = this.el.nativeElement.querySelector('.page-heading');
    const filter = this.el.nativeElement.querySelector('.filter');
    let index = 0
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            index = card?.id as unknown as number
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 150); // 200ms stagger
            // card.classList.add('visible');
            // add visible class with staggered delay
            // cards.forEach((card: any, index: number) => {
            //   setTimeout(() => {
            //     card.classList.add('visible');
            //   }, index * 200); // 200ms stagger
            // });
            // observer.disconnect(); // trigger once
          } else {
            // Remove visible class when not in view
            // const card = entry.target as HTMLElement;
            // card.classList.remove('visible');
            // index -= 1
            // cards.forEach((card: any) => card.classList.remove('visible'));
          }
        });
      },
      { threshold: 0.25 }
    );

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heading.classList.add('animate');
          filter.classList.add('animate');
          headerObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    headerObserver.observe(heading);

    cards.forEach((card: HTMLElement) => {
      observer.observe(card);
    });
  }

}
