// Cars Page Component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { BookingConfirmedComponent } from '../../components/booking-confirmed/booking-confirmed.component';
import { CarsService, Car } from '../../services/cars.service';
import { BookingService } from '../../services/booking.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { AuthService } from '../../services/auth.service';

interface Guest {
  name: string;
  age: number;
  type: 'adult' | 'child';
}

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    BookingConfirmedComponent
  ],
  templateUrl: './cars.html',
  styleUrls: ['./cars.css']
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  searching = false;
  selectedCar: Car | null = null;
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
    date: '',
    checkoutDate: ''
  };

  // Inline search form
  inlineSearch = {
    from: '',
    date: '',
    checkoutDate: ''
  };
  hasSearched = false;

  // City autocomplete
  suggestions: string[] = [];
  showSuggestions = false;
  private allCities = [
    'Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata',
    'Pune', 'Goa', 'Jaipur', 'Vijayawada', 'Visakhapatnam', 'Kochi',
    'Ahmedabad', 'Chandigarh', 'Lucknow', 'Amritsar', 'Nagpur', 'Indore'
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private carsService: CarsService,
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

    // Get search params from query, or default to popular city
    this.route.queryParams.subscribe(params => {
      const today = new Date();
      today.setDate(today.getDate() + 3);
      const defaultDate = today.toISOString().split('T')[0];
      const defaultCheckout = new Date(today);
      defaultCheckout.setDate(defaultCheckout.getDate() + 2);
      this.searchParams = {
        from: params['from'] || 'Mumbai',
        to: params['to'] || '',
        date: params['date'] || defaultDate,
        checkoutDate: params['checkoutDate'] || defaultCheckout.toISOString().split('T')[0]
      };
      this.inlineSearch = {
        from: this.searchParams.from,
        date: this.searchParams.date,
        checkoutDate: this.searchParams.checkoutDate
      };
      this.hasSearched = true;
      this.performSearch();
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
    this.searching = true;
    this.selectedCar = null;
    this.carsService.searchCars(
      this.searchParams.from,
      this.searchParams.date
    ).subscribe(cars => {
      this.cars = cars;
      this.searching = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  doInlineSearch(): void {
    if (!this.inlineSearch.from || !this.inlineSearch.date) return;
    this.searchParams = { ...this.searchParams, ...this.inlineSearch };
    this.hasSearched = true;
    this.performSearch();
  }

  onCityInput(value: string) {
    if (value.length < 2) { this.suggestions = []; this.showSuggestions = false; return; }
    this.suggestions = this.allCities.filter(c => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);
    this.showSuggestions = this.suggestions.length > 0;
  }

  selectSuggestion(city: string) {
    this.inlineSearch.from = city;
    this.suggestions = [];
    this.showSuggestions = false;
  }

  closeSuggestions() {
    setTimeout(() => { this.suggestions = []; this.showSuggestions = false; }, 200);
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
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
    if (this.selectedCar) {
      const days = this.getDaysDifference();
      return this.selectedCar.pricePerDay * days;
    }
    return 0;
  }

  getDaysDifference(): number {
    if (this.searchParams.date && this.searchParams.checkoutDate) {
      const start = new Date(this.searchParams.date);
      const end = new Date(this.searchParams.checkoutDate);
      const diff = end.getTime() - start.getTime();
      return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
    }
    return 1;
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

    if (!this.selectedCar) {
      this.errors['form'] = 'Please select a car';
      return;
    }

    const formValue = this.bookingForm.value;
    const bookingId = this.generateBookingId();
    
    const bookingData = {
      id: bookingId,
      bookingId: bookingId,
      destinationId: this.selectedCar.id,
      destinationName: `${this.selectedCar.brand} ${this.selectedCar.model}`,
      customerName: formValue.customerName,
      email: formValue.email,
      phone: formValue.phone,
      checkInDate: this.searchParams.date,
      checkOutDate: this.searchParams.checkoutDate,
      guests: this.guests.length,
      totalPrice: this.calculatePrice(),
      bookingType: 'car',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      selectedItem: this.selectedCar,
      from: this.searchParams.from,
      guestDetails: this.guests,
      specialRequests: formValue.specialRequests
    };

    // Save to localStorage
    this.saveBookingToStorage(bookingData);

    // Generate and download PDF
    this.pdfService.generateBookingPDF(bookingData, 'Car');

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
    return `WW-CAR-${timestamp}${random}`;
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
      this.pdfService.generateBookingPDF(this.bookingConfirmation, 'Car');
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
