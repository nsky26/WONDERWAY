import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

  private loadUser(): User | null {
    try {
      const u = localStorage.getItem('wonderway_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  signup(name: string, email: string, password: string, phone?: string): boolean {
    const users: any[] = JSON.parse(localStorage.getItem('wonderway_users') || '[]');
    if (users.find(u => u.email === email)) return false; // already exists
    users.push({ name, email, password, phone });
    localStorage.setItem('wonderway_users', JSON.stringify(users));
    this.setUser({ name, email, phone });
    return true;
  }

  login(email: string, password: string): boolean {
    const users: any[] = JSON.parse(localStorage.getItem('wonderway_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;
    this.setUser({ name: user.name, email: user.email, phone: user.phone });
    return true;
  }

  logout(): void {
    localStorage.removeItem('wonderway_user');
    this.currentUserSubject.next(null);
  }

  private setUser(user: User): void {
    localStorage.setItem('wonderway_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
