// Selectors for accessing bookings state
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from './bookings.reducer';

export const selectBookingsState = createFeatureSelector<BookingsState>('bookings');

export const selectAllBookings = createSelector(
  selectBookingsState,
  (state) => state.bookings
);

export const selectBookingsLoading = createSelector(
  selectBookingsState,
  (state) => state.loading
);

export const selectBookingsError = createSelector(
  selectBookingsState,
  (state) => state.error
);
