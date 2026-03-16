// Booking page component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BookingConfirmedComponent } from '../../components/booking-confirmed/booking-confirmed.component';

import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import * as BookingsActions from '../../store/bookings/bookings.actions';
import { selectBookingsLoading } from '../../store/bookings/bookings.selectors';

import { FlightsService, Flight } from '../../services/flights.service';
import { HotelsService, Hotel } from '../../services/hotels.service';
import { BusesService, Bus } from '../../services/buses.service';
import { CarsService, Car } from '../../services/cars.service';

interface Guest {
  name: string;
  age: number;
  type: 'adult' | 'child';
}

// Service tab definition
interface ServiceTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    BookingConfirmedComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  loading$: Observable<boolean>;
  bookingSuccess = false;
  bookingConfirmation: any = null;
  showConfirmedModal = false;
  bookingForm!: FormGroup;

  // Mode: 'destination' = came from destination page, else direct service
  bookingType: string = 'flights';
  isDestinationMode = false;
  destinationName = '';
  destinationId = '';

  // Active service tab (used in destination mode)
  activeService: 'flights' | 'hotels' | 'buses' | 'cars' = 'flights';

  serviceTabs: ServiceTab[] = [
    { id: 'flights', label: 'Flights',  icon: '✈️' },
    { id: 'hotels',  label: 'Hotels',   icon: '🏨' },
    { id: 'buses',   label: 'Buses',    icon: '🚌' },
    { id: 'cars',    label: 'Cars',     icon: '🚗' },
  ];

  // Search state
  searchPerformed = false;
  searching = false;

  // Search inputs (for destination mode inline search)
  searchFrom = '';
  searchTo = '';
  searchDate = '';
  searchCheckout = '';

  // Results
  flights: Flight[] = [];
  hotels: Hotel[] = [];
  buses: Bus[] = [];
  cars: Car[] = [];

  selectedItem: any = null;

  guests: Guest[] = [{ name: '', age: 18, type: 'adult' }];

  minDate = '';
  maxDate = '';

  errors: { [key: string]: string } = {};

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private auth: AuthService,
    private pdfService: PdfGeneratorService,
    private flightsService: FlightsService,
    private hotelsService: HotelsService,
    private busesService: BusesService,
    private carsService: CarsService
  ) {
    this.loading$ = this.store.select(selectBookingsLoading);
  }

  ngOnInit() {
    this.minDate = this.bookingService.getMinDate();
    this.maxDate = this.bookingService.getMaxDate();
    this.searchDate = this.minDate;
    this.searchCheckout = this.minDate;
    this.initializeForm();

    const u = this.auth.currentUser;
    if (u) {
      this.bookingForm.patchValue({ customerName: u.name, email: u.email, phone: u.phone || '' });
      if (this.guests.length > 0) this.guests[0].name = u.name;
    }

    this.route.queryParams.subscribe(params => {
      if (params['destinationId']) {
        // Destination mode — show inline service tabs + search
        this.isDestinationMode = true;
        this.destinationId = params['destinationId'];
        this.destinationName = params['destinationName'] || '';
        this.searchTo = this.destinationName;
        this.searchFrom = '';
        this.searchDate = this.minDate;
        this.searchCheckout = this.minDate;
        this.bookingForm.patchValue({ destinationName: this.destinationName });
        this.activeService = 'flights';
        this.searchPerformed = false;
      } else if (params['bookingType']) {
        // Direct service mode (from home search)
        this.isDestinationMode = false;
        this.bookingType = params['bookingType'];
        this.activeService = params['bookingType'] as any;
        this.searchFrom = params['from'] || '';
        this.searchTo = params['to'] || '';
        this.searchDate = params['date'] || this.minDate;
        this.searchCheckout = params['checkoutDate'] || this.minDate;
        this.bookingForm.patchValue({
          bookingType: params['bookingType'],
          from: this.searchFrom,
          to: this.searchTo,
          date: this.searchDate,
          checkInDate: this.searchDate,
          checkOutDate: this.searchCheckout,
          destinationName: this.searchTo || this.searchFrom
        });

        const shouldSearch =
          (this.bookingType === 'flights' && this.searchFrom && this.searchTo) ||
          (this.bookingType === 'hotels' && this.searchTo) ||
          (this.bookingType === 'buses' && this.searchFrom && this.searchTo) ||
          (this.bookingType === 'cars' && this.searchFrom);

        if (shouldSearch) this.performSearch();
        else { this.searchPerformed = true; this.searching = false; }
      }
    });
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      destinationId: [''],
      destinationName: ['', Validators.required],
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      bookingType: ['flights', Validators.required],
      specialRequests: [''],
      from: [''], to: [''], date: ['']
    });
  }

  // Switch service tab in destination mode
  switchService(svc: 'flights' | 'hotels' | 'buses' | 'cars') {
    this.activeService = svc;
    this.searchPerformed = false;
    this.selectedItem = null;
    this.flights = []; this.hotels = []; this.buses = []; this.cars = [];
    // Pre-fill to = destination for relevant services
    if (svc !== 'cars') this.searchTo = this.destinationName;
    else { this.searchFrom = this.destinationName; this.searchTo = ''; }
  }

  // Inline search (destination mode)
  doSearch() {
    const svc = this.isDestinationMode ? this.activeService : this.bookingType as any;
    this.bookingType = svc;
    this.bookingForm.patchValue({
      bookingType: svc,
      from: this.searchFrom,
      to: this.searchTo,
      date: this.searchDate,
      checkInDate: this.searchDate,
      checkOutDate: this.searchCheckout,
      destinationName: this.searchTo || this.searchFrom || this.destinationName
    });
    this.performSearch();
  }

  performSearch(): void {
    this.searching = true;
    this.searchPerformed = true;
    this.selectedItem = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const from = this.searchFrom || this.bookingForm.value.from;
    const to   = this.searchTo   || this.bookingForm.value.to;
    const date = this.searchDate || this.bookingForm.value.date;
    const checkout = this.searchCheckout || this.bookingForm.value.checkOutDate;

    switch (this.bookingType) {
      case 'flights':
        this.flightsService.searchFlights(from, to, date).subscribe(r => { this.flights = r; this.searching = false; });
        break;
      case 'hotels':
        this.hotelsService.searchHotels(to, date, checkout).subscribe(r => { this.hotels = r; this.searching = false; });
        break;
      case 'buses':
        this.busesService.searchBuses(from, to, date).subscribe(r => { this.buses = r; this.searching = false; });
        break;
      case 'cars':
        this.carsService.searchCars(from || to, date).subscribe(r => { this.cars = r; this.searching = false; });
        break;
      default:
        this.searching = false;
    }
  }

  selectForBooking(item: any, type: string): void {
    this.selectedItem = { ...item, type };
    switch (type) {
      case 'flight': this.bookingForm.patchValue({ destinationName: `${item.from} → ${item.to}`, bookingType: 'flight' }); break;
      case 'hotel':  this.bookingForm.patchValue({ destinationName: item.name, bookingType: 'hotel' }); break;
      case 'bus':    this.bookingForm.patchValue({ destinationName: `${item.from} → ${item.to}`, bookingType: 'bus' }); break;
      case 'car':    this.bookingForm.patchValue({ destinationName: `${item.brand} ${item.model}`, bookingType: 'car' }); break;
    }
    setTimeout(() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  addGuest()  { this.guests.push({ name: '', age: 18, type: 'adult' }); }
  removeGuest(i: number) { if (this.guests.length > 1) this.guests.splice(i, 1); }
  updateGuestType(i: number) { this.guests[i].type = this.guests[i].age >= 12 ? 'adult' : 'child'; }
  getAdultCount() { return this.guests.filter(g => g.type === 'adult').length; }
  getChildCount() { return this.guests.filter(g => g.type === 'child').length; }

  onSubmit() {
    this.errors = {};
    if (!this.bookingForm.valid) {
      this.markFormGroupTouched(this.bookingForm);
      this.errors['form'] = 'Please fill all required fields correctly';
      return;
    }
    if (this.getAdultCount() < 1) { this.errors['guests'] = 'At least one adult (age 12+) is required'; return; }

    const fv = this.bookingForm.value;
    const bookingId = `WW-BK-${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const bookingData: any = {
      id: bookingId, bookingId,
      destinationId: fv.destinationId || this.destinationId,
      destinationName: fv.destinationName,
      customerName: fv.customerName,
      email: fv.email, phone: fv.phone,
      checkInDate: fv.checkInDate, checkOutDate: fv.checkOutDate,
      guests: this.guests.length,
      totalPrice: this.calculatePrice(),
      bookingType: fv.bookingType || this.bookingType || 'package',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      selectedItem: this.selectedItem,
      from: fv.from || this.searchFrom || '',
      to: fv.to || this.searchTo || fv.destinationName,
      guestDetails: this.guests,
      specialRequests: fv.specialRequests
    };

    try {
      const bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
      bookings.push(bookingData);
      localStorage.setItem('wonderway_bookings', JSON.stringify(bookings));
    } catch (e) { console.error(e); }

    const type = this.selectedItem?.type || this.bookingType || 'Package';
    this.pdfService.generateBookingPDF(bookingData, type.charAt(0).toUpperCase() + type.slice(1));

    this.bookingConfirmation = bookingData;
    this.showConfirmedModal = true;
    this.bookingSuccess = true;
    setTimeout(() => { this.showConfirmedModal = false; this.bookingSuccess = false; this.router.navigate(['/']); }, 12000);
  }

  closeConfirmedModal() { this.showConfirmedModal = false; }
  downloadPDFAgain() {
    if (this.bookingConfirmation) {
      const type = this.selectedItem?.type || this.bookingType || 'Package';
      this.pdfService.generateBookingPDF(this.bookingConfirmation, type.charAt(0).toUpperCase() + type.slice(1));
    }
  }

  private markFormGroupTouched(fg: FormGroup) {
    Object.keys(fg.controls).forEach(k => fg.get(k)?.markAsTouched());
  }

  calculatePrice(): number {
    if (this.selectedItem) {
      const days = this.getDaysDifference();
      switch (this.selectedItem.type) {
        case 'flight': return this.selectedItem.price * this.guests.length;
        case 'hotel':  return this.selectedItem.pricePerNight * days;
        case 'bus':    return this.selectedItem.price * this.guests.length;
        case 'car':    return this.selectedItem.pricePerDay * days;
      }
    }
    const days = this.getDaysDifference();
    return (this.getAdultCount() * days * 150) + (this.getChildCount() * days * 75);
  }

  getDaysDifference(): number {
    const fv = this.bookingForm.value;
    if (fv.checkInDate && fv.checkOutDate) {
      const diff = new Date(fv.checkOutDate).getTime() - new Date(fv.checkInDate).getTime();
      return Math.max(1, Math.ceil(diff / 86400000));
    }
    return 1;
  }

  isFieldInvalid(f: string): boolean {
    const ctrl = this.bookingForm.get(f);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  getFieldError(f: string): string {
    const ctrl = this.bookingForm.get(f);
    if (ctrl?.errors) {
      if (ctrl.errors['required']) return 'This field is required';
      if (ctrl.errors['email']) return 'Invalid email format';
      if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters`;
      if (ctrl.errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  getStars(rating: number): number[] { return Array(Math.floor(rating)).fill(0); }

  // Label helpers
  get searchFromLabel(): string {
    return { flights: 'From City', buses: 'From City', cars: 'Pick-up City', hotels: 'City' }[this.activeService] || 'From';
  }
  get searchToLabel(): string {
    return { flights: 'To City', buses: 'To City', hotels: 'City', cars: 'Drop-off City' }[this.activeService] || 'To';
  }
  get needsFromField(): boolean { return ['flights', 'buses'].includes(this.activeService); }
  get needsToField(): boolean   { return ['flights', 'buses', 'hotels'].includes(this.activeService); }
  get needsCarCity(): boolean   { return this.activeService === 'cars'; }
  get needsCheckout(): boolean  { return ['hotels', 'cars'].includes(this.activeService); }
}
