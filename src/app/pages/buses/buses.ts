// Buses Page Component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { BookingConfirmedComponent } from '../../components/booking-confirmed/booking-confirmed.component';
import { BusesService, Bus } from '../../services/buses.service';
import { BookingService } from '../../services/booking.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { AuthService } from '../../services/auth.service';

interface Guest {
  name: string;
  age: number;
  type: 'adult' | 'child';
}

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    BookingConfirmedComponent
  ],
  templateUrl: './buses.html',
  styleUrls: ['./buses.css']
})
export class BusesComponent implements OnInit {
  buses: Bus[] = [];
  searching = false;
  selectedBus: Bus | null = null;
  bookingForm!: FormGroup;
  guests: Guest[] = [{ name: '', age: 18, type: 'adult' }];
  minDate: string = '';
  maxDate: string = '';
  errors: { [key: string]: string } = {};
  bookingSuccess = false;
  bookingConfirmation: any = null;
  showEmailModal = false;

  // Search params
  searchParams = {
    from: '',
    to: '',
    date: ''
  };

  // Inline search form
  inlineSearch = {
    from: '',
    to: '',
    date: ''
  };
  hasSearched = false;

  // City autocomplete
  suggestions: string[] = [];
  showSuggestions: 'from' | 'to' | null = null;
  private allCities = [
    'Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata',
    'Pune', 'Goa', 'Jaipur', 'Vijayawada', 'Visakhapatnam', 'Kochi',
    'Ahmedabad', 'Chandigarh', 'Lucknow', 'Amritsar', 'Nagpur', 'Indore'
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private busesService: BusesService,
    private bookingService: BookingService,
    private pdfService: PdfGeneratorService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.minDate = this.bookingService.getMinDate();
    this.maxDate = this.bookingService.getMaxDate();
    this.initializeForm();

    // Auto-fill from logged-in user
    const u = this.auth.currentUser;
    if (u) {
      this.bookingForm.patchValue({ customerName: u.name, email: u.email, phone: u.phone || '' });
      if (this.guests.length > 0) this.guests[0].name = u.name;
    }

    // Set default search params immediately
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const defaultDate = today.toISOString().split('T')[0];
    this.searchParams = {
      from: 'Delhi',
      to: 'Agra',
      date: defaultDate
    };
    this.inlineSearch = { ...this.searchParams };
    this.hasSearched = true;
    
    // Perform search immediately
    this.performSearch();

    // Also subscribe to query params for external navigation
    this.route.queryParams.subscribe(params => {
      if (params['from'] || params['to'] || params['date']) {
        this.searchParams = {
          from: params['from'] || 'Delhi',
          to: params['to'] || 'Agra',
          date: params['date'] || defaultDate
        };
        this.inlineSearch = { ...this.searchParams };
        this.hasSearched = true;
        this.performSearch();
      }
    });
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      specialRequests: ['']
    });
  }

  performSearch(): void {
    console.log('performSearch called - starting search');
    this.searching = true;
    this.selectedBus = null;
    this.busesService.searchBuses(
      this.searchParams.from,
      this.searchParams.to,
      this.searchParams.date
    ).subscribe({
      next: (buses) => {
        console.log('Buses API response:', buses);
        this.buses = buses || [];
        this.searching = false;
        console.log('Buses loaded - searching:', this.searching, 'hasSearched:', this.hasSearched, 'count:', this.buses.length);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        console.error('Buses search error:', err);
        this.buses = [];
        this.searching = false;
      }
    });
  }

  doInlineSearch(): void {
    if (!this.inlineSearch.from || !this.inlineSearch.to || !this.inlineSearch.date) return;
    this.searchParams = { ...this.inlineSearch };
    this.hasSearched = true;
    this.performSearch();
  }

  onCityInput(field: 'from' | 'to', value: string) {
    if (value.length < 2) { this.suggestions = []; this.showSuggestions = null; return; }
    this.suggestions = this.allCities.filter(c => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);
    this.showSuggestions = this.suggestions.length ? field : null;
  }

  selectSuggestion(field: 'from' | 'to', city: string) {
    if (field === 'from') this.inlineSearch.from = city;
    else this.inlineSearch.to = city;
    this.suggestions = [];
    this.showSuggestions = null;
  }

  closeSuggestions() {
    setTimeout(() => { this.suggestions = []; this.showSuggestions = null; }, 200);
  }

  selectBus(bus: Bus): void {
    this.selectedBus = bus;
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  addGuest(): void {
    this.guests.push({ name: '', age: 18, type: 'adult' });
  }

  removeGuest(index: number): void {
    if (this.guests.length > 1) {
      this.guests.splice(index, 1);
    }
  }

  updateGuestType(index: number): void {
    const guest = this.guests[index];
    guest.type = guest.age >= 12 ? 'adult' : 'child';
  }

  getAdultCount(): number {
    return this.guests.filter(g => g.type === 'adult').length;
  }

  getChildCount(): number {
    return this.guests.filter(g => g.type === 'child').length;
  }

  calculatePrice(): number {
    if (this.selectedBus) {
      return this.selectedBus.price * this.guests.length;
    }
    return 0;
  }

  onSubmit() {
    this.errors = {};

    if (!this.bookingForm.valid) {
      this.markFormGroupTouched(this.bookingForm);
      this.errors['form'] = 'Please fill all required fields correctly';
      return;
    }

    if (this.getAdultCount() < 1) {
      this.errors['guests'] = 'At least one adult (age 12+) is required';
      return;
    }

    if (!this.selectedBus) {
      this.errors['form'] = 'Please select a bus';
      return;
    }

    const formValue = this.bookingForm.value;
    const bookingId = this.generateBookingId();
    
    const bookingData = {
      id: bookingId,
      bookingId: bookingId,
      destinationId: this.selectedBus.id,
      destinationName: `${this.selectedBus.from} to ${this.selectedBus.to}`,
      customerName: formValue.customerName,
      email: formValue.email,
      phone: formValue.phone,
      checkInDate: this.searchParams.date,
      checkOutDate: this.searchParams.date,
      guests: this.guests.length,
      totalPrice: this.calculatePrice(),
      bookingType: 'bus',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      selectedItem: this.selectedBus,
      from: this.selectedBus.from,
      to: this.selectedBus.to,
      guestDetails: this.guests,
      specialRequests: formValue.specialRequests
    };

    // Save to localStorage
    this.saveBookingToStorage(bookingData);

    // Generate and download PDF
    this.pdfService.generateBookingPDF(bookingData, 'Bus');

    // Show confirmation
    this.bookingConfirmation = bookingData;
    this.bookingSuccess = true;
    this.showEmailModal = true;

    // Reset after 10 seconds
    setTimeout(() => {
      this.bookingSuccess = false;
      this.showEmailModal = false;
      this.router.navigate(['/']);
    }, 10000);
  }

  private saveBookingToStorage(booking: any): void {
    try {
      const bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('wonderway_bookings', JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  }

  private generateBookingId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `WW-FL-${timestamp}${random}`;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookingForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.bookingForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      if (field.errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
  }

  downloadPDFAgain(): void {
    if (this.bookingConfirmation) {
      this.pdfService.generateBookingPDF(this.bookingConfirmation, 'Bus');
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  trackByBusId(index: number, bus: any): string {
    return bus.id;
  }
}
