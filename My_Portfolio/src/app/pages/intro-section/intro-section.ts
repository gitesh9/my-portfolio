import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';

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

  ngOnInit() {
    this.type();
  }

  type() {
    if (this.charIndex < this.texts[this.textIndex].length) {
      this.displayedText.update(prev => prev + this.texts[this.textIndex][this.charIndex++]);
      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      setTimeout(() => this.erase(), this.pauseAfterType);
    }
  }

  erase() {
    if (this.charIndex > 0) {
      this.displayedText.set('');
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      this.charIndex = 0;
      this.type()
    }
  }
}
