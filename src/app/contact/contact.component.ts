import { Component, Inject } from '@angular/core';
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

    // Debug: Log the credentials being used
    console.log('EmailJS Debug Info:', {
      serviceId: this.emailjsServiceId,
      templateId: this.emailjsTemplateId,
      publicKey: this.emailjsPublicKey,
      formData: this.formData
    });

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

      console.log('EmailJS Success:', result);
      this.submitSuccess = true;
      this.formData = { name: '', email: '', message: '' };
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
