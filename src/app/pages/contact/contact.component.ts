// Contact page component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PageHeaderComponent,
    SuccessMessageComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  submitted = false;
  private readonly STORAGE_KEY = 'wonderway_contacts';

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Contact form submitted:', this.contactForm);
      
      // Save to localStorage
      this.saveContactToStorage();
      
      this.submitted = true;

      // Reset form after 5 seconds
      setTimeout(() => {
        this.submitted = false;
        this.resetForm();
      }, 5000);
    }
  }

  private saveContactToStorage(): void {
    try {
      const contactData = {
        ...this.contactForm,
        id: this.generateContactId(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const contacts = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      contacts.push(contactData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
      
      console.log('Contact saved to localStorage:', contactData);
    } catch (error) {
      console.error('Error saving contact to storage:', error);
    }
  }

  private generateContactId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `WW-CONTACT-${timestamp}${random}`;
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.subject &&
      this.contactForm.message
    );
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
