import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  // Focus states
  nameFocus = false;
  emailFocus = false;
  phoneFocus = false;
  pwFocus = false;
  cpwFocus = false;

  // Password visibility
  showPw = false;
  showCpw = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn) this.router.navigate(['/']);
  }

  get pwStrength(): number {
    if (!this.password) return 0;
    if (this.password.length < 4) return 1;
    if (this.password.length < 8) return 2;
    return 3;
  }

  onSubmit() {
    this.error = '';
    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.error = 'Please fill in all required fields';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.signup(this.name.trim(), this.email.trim(), this.password, this.phone);
      this.loading = false;
      if (ok) {
        this.router.navigate(['/']);
      } else {
        this.error = 'An account with this email already exists';
      }
    }, 700);
  }
}
