import { Component } from '@angular/core';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Heading } from "@app/shared/components/heading/heading";
import { SkillsByCategory } from 'assets/user_data';
import { DataProvider } from '@app/data-provider';
import { CommonModule } from '@angular/common';
import { Skill } from "./components/skill/skill";
@Component({
  selector: 'app-skills-section',
  imports: [SectionWrapper, Heading, CommonModule, Skill],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.css',
})
export class SkillsSection {
  data: SkillsByCategory

  constructor(dataProvider: DataProvider){
    this.data = dataProvider.getSkills()
  }

}
