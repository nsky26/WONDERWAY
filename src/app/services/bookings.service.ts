// Service for managing bookings
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  
  private bookings: Booking[] = [];

  constructor() { }

  // Create a new booking
  createBooking(booking: Booking): Observable<Booking> {
    const newBooking = {
      ...booking,
      id: this.generateId(),
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    return of(newBooking).pipe(delay(800));
  }

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    return of(this.bookings).pipe(delay(500));
  }

  // Generate unique ID
  private generateId(): string {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
}
