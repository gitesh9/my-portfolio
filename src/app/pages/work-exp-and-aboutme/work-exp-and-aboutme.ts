import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataProvider } from '@app/data-provider';
import { Card } from '@app/shared/components/card/card';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { WorkExperience } from 'assets/user_data';

export interface TimelineItem {
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-work-exp-and-aboutme',
  imports: [SectionWrapper, CommonModule, Heading, Card],
  templateUrl: './work-exp-and-aboutme.html',
  styleUrl: './work-exp-and-aboutme.css',
})
export class WorkExpAndAboutme {
  data: WorkExperience[];
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
  constructor( dataProvider: DataProvider){
    this.data = dataProvider.getWorkExperience()
  }

}
