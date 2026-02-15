// Actions for bookings state management
import { createAction, props } from '@ngrx/store';
import { Booking } from '../../models/booking.model';

export const createBooking = createAction(
  '[Bookings] Create Booking',
  props<{ booking: Booking }>()
);

export const createBookingSuccess = createAction(
  '[Bookings] Create Booking Success',
  props<{ booking: Booking }>()
);

export const createBookingFailure = createAction(
  '[Bookings] Create Booking Failure',
  props<{ error: string }>()
);

export const loadBookings = createAction('[Bookings] Load Bookings');

export const loadBookingsSuccess = createAction(
  '[Bookings] Load Bookings Success',
  props<{ bookings: Booking[] }>()
);
