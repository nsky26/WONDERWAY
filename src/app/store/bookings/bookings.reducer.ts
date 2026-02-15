// Reducer for managing bookings state
import { createReducer, on } from '@ngrx/store';
import { Booking } from '../../models/booking.model';
import * as BookingsActions from './bookings.actions';

export interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

export const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null
};

export const bookingsReducer = createReducer(
  initialState,
  
  on(BookingsActions.createBooking, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(BookingsActions.createBookingSuccess, (state, { booking }) => ({
    ...state,
    bookings: [...state.bookings, booking],
    loading: false,
    error: null
  })),
  
  on(BookingsActions.createBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(BookingsActions.loadBookingsSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false
  }))
);
