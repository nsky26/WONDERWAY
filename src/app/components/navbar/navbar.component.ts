import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  bookingsCount = 0;
  currentUser: User | null = null;
  showUserMenu = false;
  private sub!: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) this.updateBookingsCount();
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  updateBookingsCount() {
    try {
      const bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
      this.bookingsCount = bookings.length;
    } catch { this.bookingsCount = 0; }
  }

  logout() {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate(['/']);
  }

  get userInitial(): string {
    return this.currentUser?.name?.charAt(0).toUpperCase() || '?';
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }
  toggleUserMenu() { this.showUserMenu = !this.showUserMenu; }
  closeUserMenu() { setTimeout(() => this.showUserMenu = false, 150); }
}
