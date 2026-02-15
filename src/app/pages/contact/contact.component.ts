// Contact page component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarComponent,
    FooterComponent
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

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Contact form submitted:', this.contactForm);
      this.submitted = true;

      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted = false;
        this.resetForm();
      }, 3000);
    }
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
