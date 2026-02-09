import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, signal } from '@angular/core';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { DataProvider } from '@app/data-provider';
import { FILTER_CATEGORIES, FilterCategory, Project } from 'assets/user_data';
import { ProjectCard } from "./components/project-card/project-card";
import { ProjectFilter } from "./components/project-filter/project-filter";

@Component({
  selector: 'app-project-section',
  imports: [CommonModule, SectionWrapper, Heading, ProjectCard, ProjectFilter],
  templateUrl: './project-section.html',
  styleUrl: './project-section.css',
})
export class ProjectSection {
  visibleItems: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  data = signal<Project[] | null>(null)
  selectedFilterCategory = signal<FilterCategory>('All')
  cardObserver!: IntersectionObserver;
  headerObserver!: IntersectionObserver;
  firstViewed: boolean = false;

  constructor(private el: ElementRef, dataProvider: DataProvider) {
    this.data.set(dataProvider.getProjects())
    effect(() => {
      this.filteredProjects();
      this.hideCards();
      queueMicrotask(() => {
        this.showCards();
      });
    })
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
            this.firstViewed = true
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 150);
          } else {
            // Remove visible class when not in view
            const card = entry.target as HTMLElement;
            card.classList.remove('visible');
          }
        });
      },
      { threshold: 0.2 }
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

  hideCards() {
    if (!this.firstViewed) return
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    console.log("triggered: ", cards)
    let index = 0
    cards.forEach((card: HTMLElement) => {
      card.classList.add('hidden');
      card.classList.remove('visible');
    })
  }

  showCards() {
    if (!this.firstViewed) return
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    console.log("triggered: ", cards)
    let index = 0
    cards.forEach((card: HTMLElement) => {
      setTimeout(() => {
        card.classList.remove('hidden');
        card.classList.add('visible');
    }, (index+1) * 100);
    index += 1
    });
  }

  handleFilterSelect = (value: FilterCategory)=>{
    this.selectedFilterCategory.set(value)
  }

  filteredProjects = computed(() => {
    const selected = this.selectedFilterCategory();
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
