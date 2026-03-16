// Booking Service - Handles all booking operations
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];
  private readonly STORAGE_KEY = 'wonderway_bookings';

  constructor() {
    this.loadBookingsFromStorage();
  }

  // Load bookings from localStorage
  private loadBookingsFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.bookings = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading bookings from storage:', error);
      this.bookings = [];
    }
  }

  // Save bookings to localStorage
  private saveBookingsToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookings));
    } catch (error) {
      console.error('Error saving bookings to storage:', error);
    }
  }

  // Create a new booking
  createBooking(booking: Booking): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.generateBookingId(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    this.bookings.push(newBooking);
    this.saveBookingsToStorage();
    return of(newBooking).pipe(delay(500));
  }

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  // Get booking by ID
  getBookingById(id: string): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    return of(booking);
  }

  // Cancel booking
  cancelBooking(id: string): Observable<boolean> {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = 'cancelled';
      this.saveBookingsToStorage();
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  // Clear all bookings (for testing)
  clearAllBookings(): void {
    this.bookings = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Generate unique booking ID
  private generateBookingId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `BK${timestamp}${random}`;
  }

  // Validate booking dates
  validateDates(checkIn: string, checkOut: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Check if dates are in the future
    if (checkInDate < today) {
      return false;
    }
    
    // Check if checkout is after checkin
    if (checkOutDate <= checkInDate) {
      return false;
    }
    
    // Check if within 3 months
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    if (checkInDate > threeMonthsFromNow) {
      return false;
    }
    
    return true;
  }

  // Get minimum date (today)
  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Get maximum date (3 months from now)
  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  }
}
