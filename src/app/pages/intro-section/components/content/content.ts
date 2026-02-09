import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { DataProvider } from '@app/data-provider';
import { About } from 'assets/user_data';
import { Status } from "../status/status";

@Component({
  selector: 'app-content',
  imports: [Status],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  displayedText = signal('');

  textIndex = 0;
  charIndex = 0;

  typingSpeed = 100;
  deletingSpeed = 50;
  pauseAfterType = 1500;
  pauseAfterDelete = 300;
  data: About

  constructor(protected dataProvider: DataProvider, private cdr: ChangeDetectorRef){
    this.data = dataProvider.getAbout()
  }

  ngOnInit() {
    this.type();
  }

  type() {
    if (this.charIndex < this.data.roleTitles[this.textIndex].length) {
      this.displayedText.update(prev => prev + this.data.roleTitles[this.textIndex][this.charIndex++]);
      setTimeout(() => {
        this.cdr.markForCheck();  // Manually trigger change detection
        this.type();
      }, this.typingSpeed);
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
