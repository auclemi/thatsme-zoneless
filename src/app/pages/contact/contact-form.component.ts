import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  contactForm: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submit() {
    if (this.contactForm.invalid || this.loading) return;

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.contactService.sendContact(this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Votre message a bien été envoyé.';
        this.contactForm.reset();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
