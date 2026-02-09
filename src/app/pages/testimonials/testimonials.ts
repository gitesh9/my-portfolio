import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Signal, computed, effect, signal } from '@angular/core';
import { DataProvider } from '@app/data-provider';
import { Card } from '@app/shared/components/card/card';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Achievement, Testimonial } from 'assets/user_data';

@Component({
  selector: 'app-testimonials',
  imports:[ Card, CommonModule,Heading,SectionWrapper],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnDestroy {
  currentIndex = signal(0);
  displayTestimonial = computed<Testimonial | null>(() => {
    const item = this.data[this.currentIndex()]

    if (item?.type === 'testimonial') {
      return item;
    }

    return null;
  });
  displayAchievement = computed<Achievement | null>(() => {
    const item = this.data[this.currentIndex()]
    if(item?.type=='achievement'){
      return item
    }
    else{
      return null;
    }
});

  data: (Achievement | Testimonial)[] = [];
  intervalId!: number;

  readonly DURATION = 10000; // 4 seconds

  constructor(dataProvider: DataProvider) {
    this.data = [
      ...dataProvider.getAchievements(),
      ...dataProvider.getTestimonials()
    ];

    // Start the loop after signals are set up
    this.startLoop();
  }

  startLoop() {
    this.intervalId = window.setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.data.length);
    }, this.DURATION);
  }

  getInitials():string{
    let name = this.displayTestimonial()?.user?.name?.split(" ")
    return name? name[0][0] + (name?.length==2?name[1][0]:''):'SK';
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
