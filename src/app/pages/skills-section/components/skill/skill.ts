import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkillDetails } from 'assets/user_data';
import { ProgressBar } from "../progress-bar/progress-bar";

@Component({
  selector: 'app-skill',
  imports: [CommonModule, ProgressBar],
  templateUrl: './skill.html',
  styleUrl: './skill.css',
})
export class Skill {
  @Input() skill!: SkillDetails;
}
