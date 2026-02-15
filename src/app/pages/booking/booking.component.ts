// Booking page component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { Booking } from '../../models/booking.model';
import * as BookingsActions from '../../store/bookings/bookings.actions';
import { selectBookingsLoading } from '../../store/bookings/bookings.selectors';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  loading$: Observable<boolean>;
  bookingSuccess = false;

  bookingForm = {
    destinationId: '',
    destinationName: '',
    customerName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    bookingType: 'package' as 'flight' | 'hotel' | 'package',
    specialRequests: ''
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading$ = this.store.select(selectBookingsLoading);
  }

  ngOnInit() {
    // Get destination ID from query params if available
    this.route.queryParams.subscribe(params => {
      if (params['destinationId']) {
        this.bookingForm.destinationId = params['destinationId'];
      }
    });
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
    // Simple price calculation based on guests and days
    const days = this.getDaysDifference();
    return this.bookingForm.guests * days * 150; // $150 per person per day
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
      specialRequests: ''
    };
  }
}
