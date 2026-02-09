import { Component, Input, signal } from '@angular/core';
import { Card } from "@app/shared/components/card/card";
import { Project } from 'assets/user_data';
import { Tags } from "@app/shared/components/tags/tags";

@Component({
  selector: 'app-project-card',
  imports: [Card, Tags],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project;
  @Input() index!: number;

  hoveredIndex = signal<number | null>(null);
}
