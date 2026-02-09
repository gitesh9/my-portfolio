import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  form: FormGroup;
  formSubmitted = signal(false);
  inProgress = signal(false);
  constructor( private fb: FormBuilder){
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    });
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
}
