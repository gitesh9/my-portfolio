import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [CommonModule],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  @Input() tagName: 'h1' | 'h2' | 'h3' | 'h4' = 'h1';
  @Input() classNames: string = "";
  @Input() animate: boolean = true;
  @ContentChild(TemplateRef) contentTpl!: TemplateRef<unknown>;
  headerObserver!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (!this.animate) {
      return
    }
    const heading: HTMLElement = this.el.nativeElement.querySelector('.heading');
    this.headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heading.classList.add('page-load-animate');
          // headerObserver.disconnect();
        } else {
          heading.classList.remove('page-load-animate');
        }
      },
      { threshold: 0.3 }
    );

    this.headerObserver.observe(heading);
  }

  onDestroy() {
    this.headerObserver.disconnect()
  }
}
