import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, signal } from '@angular/core';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Tags } from "@app/shared/components/tags/tags";
import { Card } from "@app/shared/components/card/card";
import { DataProvider } from '@app/data-provider';
import { FILTER_CATEGORIES, FilterCategory, Project } from 'assets/user_data';

@Component({
  selector: 'app-project-section',
  imports: [CommonModule, SectionWrapper, Heading, Tags, Card],
  templateUrl: './project-section.html',
  styleUrl: './project-section.css',
})
export class ProjectSection {
  visibleItems: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedCategory = signal<FilterCategory | null>('All');
  data = signal<Project[] | null>(null)
  FILTER_CATEGORIES: readonly FilterCategory[];
  hoveredIndex = signal<number | null>(null);
  cardObserver!: IntersectionObserver;
  headerObserver!: IntersectionObserver;
  firstViewed: boolean = false;

  constructor(private el: ElementRef, dataProvider: DataProvider) {
    this.data.set(dataProvider.getProjects())
    this.FILTER_CATEGORIES = FILTER_CATEGORIES
    effect(() => {
      this.filteredProjects();
      queueMicrotask(() => {
        this.showCards();
      });
    });
  }

  ngAfterViewInit() {
    // Simulate loading items with a delay for animation effect
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    const heading = this.el.nativeElement.querySelector('.page-heading');
    const filter = this.el.nativeElement.querySelector('.filter');
    let index = 0
    this.cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            index = card?.id as unknown as number
            this.firstViewed = true;
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
            const card = entry.target as HTMLElement;
            card.classList.remove('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    this.headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heading.classList.add('animate');
          filter.classList.add('animate');
          this.headerObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    this.headerObserver.observe(heading);

    cards.forEach((card: HTMLElement) => {
      this.cardObserver.observe(card);
    });
  }

  showCards() {
    if (!this.firstViewed) return
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    console.log("triggered: ", cards)
    let index = 0
    cards.forEach((card: HTMLElement) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200);
      index += 1
    });
  }

  handleSelect(filter: FilterCategory) {
    this.selectedCategory.update(current =>
      current === filter ? "All" : filter
    );
  }

  filteredProjects = computed(() => {
    const selected = this.selectedCategory();
    const projects = this.data();

    if (!projects) return [];

    if (selected === "All") {
      return projects;
    }
    if (!selected) return projects
    return projects.filter(project =>
      project.category.includes(selected)
    );
  });

  onDestroy() {
    this.cardObserver.disconnect()
    this.headerObserver.disconnect()
  }
}
