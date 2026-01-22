import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';

export interface TimelineItem {
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-work-exp-and-aboutme',
  imports: [RouterLink, SectionWrapper, CommonModule, Heading],
  templateUrl: './work-exp-and-aboutme.html',
  styleUrl: './work-exp-and-aboutme.css',
})
export class WorkExpAndAboutme {
  protected items: TimelineItem[] = [
    {
      title: 'Software Engineer',
      company: 'EPAM Systems',
      date: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers on a SaaS platform.',
      skills: ['React',
        'TypeScript',
        'GraphQL',
        'AWS']
    },
    {
      title: 'Software Engineer',
      company: 'EPAM Systems',
      date: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers on a SaaS platform.',
      skills: ['React',
        'TypeScript',
        'GraphQL',
        'AWS']
    },
    {
      title: 'Software Engineer',
      company: 'EPAM Systems',
      date: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers on a SaaS platform.',
      skills: ['React',
        'TypeScript',
        'GraphQL',
        'AWS']
    },
    {
      title: 'Software Engineer',
      company: 'EPAM Systems',
      date: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers on a SaaS platform.',
      skills: ['React',
        'TypeScript',
        'GraphQL',
        'AWS']
    },
    {
      title: 'Software Engineer',
      company: 'EPAM Systems',
      date: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers on a SaaS platform.',
      skills: ['React',
        'TypeScript',
        'GraphQL',
        'AWS']
    },
  ];

}
