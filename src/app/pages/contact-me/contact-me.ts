import { Component, ElementRef, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '@app/shared/components/section-wrapper/section-wrapper';
import { Heading } from "@app/shared/components/heading/heading";
import { Tags } from "@app/shared/components/tags/tags";
import { About } from 'assets/user_data';
import { DataProvider } from '@app/data-provider';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  imports: [SectionWrapper, Heading, Tags, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {
  data: About;
  form: FormGroup;
  formSubmitted = signal(false);
  inProgress = signal(false);
  connectingTags: { name: string; link: string }[] = [];
  observerHeading!: IntersectionObserver;
  observerContact!: IntersectionObserver;

  constructor(private el: ElementRef, dataProvider: DataProvider, private fb: FormBuilder) {
    this.data = dataProvider.getAbout();
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    });
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

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.inProgress.set(true)
    fetch('https://formsubmit.co/ajax/giteshwan98@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.form.value)
    })
      .then(() => {
        this.form.reset();
        this.formSubmitted.set(true);
        setTimeout(() => {
          this.formSubmitted.set(false);
        }, 4000);
      })
      .catch(() => {
        alert('Something went wrong.');
      });
    this.inProgress.set(false)
  }
  onDestroy() {
    this.observerContact.disconnect()
    this.observerHeading.disconnect()
  }
}
