// Booking page component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';

import { Booking } from '../../models/booking.model';
import * as BookingsActions from '../../store/bookings/bookings.actions';
import { selectBookingsLoading } from '../../store/bookings/bookings.selectors';

// Import booking services
import { FlightsService, Flight } from '../../services/flights.service';
import { HotelsService, Hotel } from '../../services/hotels.service';
import { BusesService, Bus } from '../../services/buses.service';
import { CarsService, Car } from '../../services/cars.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PageHeaderComponent,
    SuccessMessageComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  loading$: Observable<boolean>;
  bookingSuccess = false;
  
  // Booking type and search results
  bookingType: string = 'package';
  searchPerformed = false;
  searching = false;
  
  // Search results
  flights: Flight[] = [];
  hotels: Hotel[] = [];
  buses: Bus[] = [];
  cars: Car[] = [];
  
  // Selected item for booking
  selectedItem: any = null;

  bookingForm = {
    destinationId: '',
    destinationName: '',
    customerName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    bookingType: 'package' as 'flight' | 'hotel' | 'package' | 'bus' | 'car' | 'cruise',
    specialRequests: '',
    // Search parameters
    from: '',
    to: '',
    date: ''
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private flightsService: FlightsService,
    private hotelsService: HotelsService,
    private busesService: BusesService,
    private carsService: CarsService
  ) {
    this.loading$ = this.store.select(selectBookingsLoading);
  }

  ngOnInit() {
    // Get booking details from query params
    this.route.queryParams.subscribe(params => {
      // Handle destination booking
      if (params['destinationId']) {
        this.bookingForm.destinationId = params['destinationId'];
      }
      if (params['destinationName']) {
        this.bookingForm.destinationName = params['destinationName'];
      }
      if (params['price']) {
        this.bookingForm.guests = 1;
      }
      
      // Handle offer bookings
      if (params['offerId']) {
        this.bookingForm.destinationName = params['destinationName'] || '';
        this.bookingForm.bookingType = params['offerType'] || 'package';
      }
      
      // Handle search bookings (from hero section)
      if (params['bookingType']) {
        this.bookingType = params['bookingType'];
        this.bookingForm.bookingType = params['bookingType'] as any;
        this.bookingForm.from = params['from'] || '';
        this.bookingForm.to = params['to'] || '';
        this.bookingForm.date = params['date'] || '';
        this.bookingForm.guests = params['travelers'] || 1;
        
        // Perform search automatically if search params are present
        if (this.bookingForm.from && this.bookingForm.to) {
          this.performSearch();
        }
      }
    });
  }

  // Perform search based on booking type
  performSearch(): void {
    this.searching = true;
    this.searchPerformed = true;
    this.selectedItem = null;
    
    switch (this.bookingType) {
      case 'flights':
        this.flightsService.searchFlights(
          this.bookingForm.from,
          this.bookingForm.to,
          this.bookingForm.date
        ).subscribe(flights => {
          this.flights = flights;
          this.searching = false;
        });
        break;
        
      case 'hotels':
        this.hotelsService.searchHotels(
          this.bookingForm.to,
          this.bookingForm.checkInDate,
          this.bookingForm.checkOutDate
        ).subscribe(hotels => {
          this.hotels = hotels;
          this.searching = false;
        });
        break;
        
      case 'buses':
        this.busesService.searchBuses(
          this.bookingForm.from,
          this.bookingForm.to,
          this.bookingForm.date
        ).subscribe(buses => {
          this.buses = buses;
          this.searching = false;
        });
        break;
        
      case 'cars':
        this.carsService.searchCars(
          this.bookingForm.from || this.bookingForm.to,
          this.bookingForm.date
        ).subscribe(cars => {
          this.cars = cars;
          this.searching = false;
        });
        break;
        
      default:
        this.searching = false;
        break;
    }
  }
  
  // Select item for booking
  selectForBooking(item: any, type: string): void {
    this.selectedItem = { ...item, type };
    
    // Pre-fill booking form based on selection
    switch (type) {
      case 'flight':
        this.bookingForm.destinationName = `${item.from} to ${item.to}`;
        this.bookingForm.bookingType = 'flight';
        break;
      case 'hotel':
        this.bookingForm.destinationName = item.name;
        this.bookingForm.bookingType = 'hotel';
        break;
      case 'bus':
        this.bookingForm.destinationName = `${item.from} to ${item.to}`;
        this.bookingForm.bookingType = 'bus';
        break;
      case 'car':
        this.bookingForm.destinationName = `${item.brand} ${item.model}`;
        this.bookingForm.bookingType = 'car';
        break;
    }
    
    // Scroll to booking form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  onSubmit() {
    if (this.isFormValid()) {
      const booking: Booking = {
        id: '',
        destinationId: this.bookingForm.destinationId,
        destinationName: this.bookingForm.destinationName,
        customerName: this.bookingForm.customerName,
        email: this.bookingForm.email,
        phone: this.bookingForm.phone,
        checkInDate: this.bookingForm.checkInDate,
        checkOutDate: this.bookingForm.checkOutDate,
        guests: this.bookingForm.guests,
        totalPrice: this.calculatePrice(),
        bookingType: this.bookingForm.bookingType,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      this.store.dispatch(BookingsActions.createBooking({ booking }));
      this.bookingSuccess = true;

      // Reset form after 3 seconds
      setTimeout(() => {
        this.bookingSuccess = false;
        this.resetForm();
      }, 3000);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.bookingForm.destinationName &&
      this.bookingForm.customerName &&
      this.bookingForm.email &&
      this.bookingForm.phone &&
      this.bookingForm.checkInDate &&
      this.bookingForm.checkOutDate
    );
  }

  calculatePrice(): number {
    if (this.selectedItem) {
      switch (this.selectedItem.type) {
        case 'flight':
          return this.selectedItem.price * this.bookingForm.guests;
        case 'hotel':
          const days = this.getDaysDifference();
          return this.selectedItem.pricePerNight * days;
        case 'bus':
          return this.selectedItem.price * this.bookingForm.guests;
        case 'car':
          const rentalDays = this.getDaysDifference();
          return this.selectedItem.pricePerDay * rentalDays;
      }
    }
    
    // Default calculation
    const days = this.getDaysDifference();
    return this.bookingForm.guests * days * 150;
  }

  getDaysDifference(): number {
    if (this.bookingForm.checkInDate && this.bookingForm.checkOutDate) {
      const checkIn = new Date(this.bookingForm.checkInDate);
      const checkOut = new Date(this.bookingForm.checkOutDate);
      const diff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diff / (1000 * 3600 * 24));
    }
    return 1;
  }

  resetForm() {
    this.bookingForm = {
      destinationId: '',
      destinationName: '',
      customerName: '',
      email: '',
      phone: '',
      checkInDate: '',
      checkOutDate: '',
      guests: 1,
      bookingType: 'package',
      specialRequests: '',
      from: '',
      to: '',
      date: ''
    };
    this.selectedItem = null;
  }
  
  // Helper methods for templates
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
