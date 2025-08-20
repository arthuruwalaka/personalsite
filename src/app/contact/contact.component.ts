import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // EmailJS credentials from environment
  private emailjsServiceId = environment.emailjsServiceId;
  private emailjsTemplateId = environment.emailjsTemplateId;
  private emailjsPublicKey = environment.emailjsPublicKey;

  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  async onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const result = await emailjs.send(
        this.emailjsServiceId,
        this.emailjsTemplateId,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message,
        },
        this.emailjsPublicKey
      );

      this.submitSuccess = true;
      this.formData = { name: '', email: '', message: '' };
    } catch (error) {
      this.submitError = true;
      console.error('EmailJS error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
