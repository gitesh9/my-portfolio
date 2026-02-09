import { Component, ElementRef } from '@angular/core';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { About } from 'assets/user_data';
import { DataProvider } from '@app/data-provider';
import { ContactForm } from "./components/contact-form/contact-form";
import { ContactLinks } from "./components/contact-links/contact-links";
import { ContactHeaderSection } from "./components/contact-header-section/contact-header";

@Component({
  selector: 'app-contact-me',
  imports: [SectionWrapper, ContactForm, ContactLinks, ContactHeaderSection],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {
  data: About;
  connectingTags: { name: string; link: string }[] = [];
  observerHeading!: IntersectionObserver;
  observerContact!: IntersectionObserver;

  constructor(private el: ElementRef, dataProvider: DataProvider) {
    this.data = dataProvider.getAbout();
    this.connectingTags = [{ name: "Github", link: this.data.githubLink }, { name: "LeetCode", link: this.data.leetCode }, { name: "LinkedIn", link: this.data.linkedInLink }, { name: "DevPost", link: this.data.DevPost }]
  }

  ngAfterViewInit(): void {
    const heading = this.el.nativeElement.querySelector('.header');
    const contact = this.el.nativeElement.querySelector('.contact-form');
    this.observerHeading = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            setTimeout(() => {
              card.classList.add('animate-side-right');
            }, 150);
          } else {
            const card = entry.target as HTMLElement;
            card.classList.remove('animate-side-right');
          }
        });
      },
      { threshold: 0.3 }
    );
    this.observerContact = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            setTimeout(() => {
              card.classList.add('animate-side-left');
            }, 150);
          } else {
            const card = entry.target as HTMLElement;
            card.classList.remove('animate-side-left');
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observerHeading.observe(heading)
    this.observerContact.observe(contact)
  }

  onDestroy() {
    this.observerContact.disconnect()
    this.observerHeading.disconnect()
  }
}
