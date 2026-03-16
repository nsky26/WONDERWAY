import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  emailFocus = false;
  pwFocus = false;
  showPw = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn) this.router.navigate(['/']);
  }

  onSubmit() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.login(this.email, this.password);
      this.loading = false;
      if (ok) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Invalid email or password';
      }
    }, 600);
  }
}
