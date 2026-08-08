import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';
import { CurrencyService, Currency } from '../../services/currency.service';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isMobileBookOpen = false;
  bookingsCount = 0;
  currentUser: User | null = null;
  showUserMenu = false;
  currencies: Currency[] = [];
  languages: Language[] = [];
  selectedCurrencyCode: string = 'USD';
  selectedLanguageCode: string = 'en';
  
  private sub!: Subscription;
  private currencySub!: Subscription;
  private langSub!: Subscription;

  constructor(
    private auth: AuthService, 
    private router: Router,
    public currencyService: CurrencyService,
    public languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currencies = this.currencyService.currencies;
    this.selectedCurrencyCode = this.currencyService.getCurrentCurrency();

    this.languages = this.languageService.languages;
    this.selectedLanguageCode = this.languageService.getCurrentLanguage();
    
    this.sub = this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.updateBookingsCount();
    });

    this.currencySub = this.currencyService.currentCurrency$.subscribe(code => {
      this.selectedCurrencyCode = code;
    });

    this.langSub = this.languageService.currentLanguage$.subscribe(code => {
      this.selectedLanguageCode = code;
    });

    this.updateBookingsCount();
  }

  ngOnDestroy() { 
    this.sub?.unsubscribe(); 
    this.currencySub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  updateBookingsCount() {
    try {
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
        this.bookingsCount = bookings.length;
      }
    } catch { 
      this.bookingsCount = 0; 
    }
  }

  onCurrencyChange(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    this.currencyService.setCurrentCurrency(code);
  }

  onLanguageChange(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(code);
  }

  logout() {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate(['/']);
  }

  get userInitial(): string {
    return this.currentUser?.name?.charAt(0).toUpperCase() || 'U';
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; this.isMobileBookOpen = false; }
  toggleUserMenu() { this.showUserMenu = !this.showUserMenu; }
  closeUserMenu() { setTimeout(() => this.showUserMenu = false, 150); }
  toggleMobileBookDropdown() { this.isMobileBookOpen = !this.isMobileBookOpen; }
}
