import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataProvider } from '@app/data-provider';
import { Heading } from '@app/shared/components/heading/heading';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { WorkExperience } from 'assets/user_data';
import { TimelineItem } from "./components/timeline-item/timeline-item";

@Component({
  selector: 'app-work-exp-and-aboutme',
  imports: [SectionWrapper, CommonModule, Heading, TimelineItem],
  templateUrl: './work-exp-and-aboutme.html',
  styleUrl: './work-exp-and-aboutme.css',
})
export class WorkExpAndAboutme {
  data: WorkExperience[];
  constructor( dataProvider: DataProvider){
    this.data = dataProvider.getWorkExperience()
  }

}
