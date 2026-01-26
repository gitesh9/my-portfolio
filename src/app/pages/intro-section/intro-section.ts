import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataProvider } from '@app/data-provider';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { About } from 'assets/user_data';

@Component({
  selector: 'app-intro-section',
  imports: [RouterLink, SectionWrapper],
  templateUrl: './intro-section.html',
  styleUrl: './intro-section.css',
})
export class IntroSection {
  texts: string[] = ['Full Stack Software Developer', 'Full-Stack Developer • Creating Digital Experiences', 'React Specialist', 'Senior Software Engineer', 'Lead Developer'];
  displayedText = signal('');

  textIndex = 0;
  charIndex = 0;

  typingSpeed = 100;
  deletingSpeed = 50;
  pauseAfterType = 1500;
  pauseAfterDelete = 300;
  data: About

  constructor(protected dataProvider: DataProvider){
    this.data = dataProvider.getAbout()
  }

  ngOnInit() {
    this.type();
  }

  type() {
    if (this.charIndex < this.data.roleTitles[this.textIndex].length) {
      this.displayedText.update(prev => prev + this.data.roleTitles[this.textIndex][this.charIndex++]);
      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      setTimeout(() => this.erase(), this.pauseAfterType);
    }
  }

  erase() {
    if (this.charIndex > 0) {
      this.displayedText.set('');
      this.textIndex = (this.textIndex + 1) % this.data.roleTitles.length;
      this.charIndex = 0;
      this.type()
    }
  }
}
