// Selectors for accessing destination state
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DestinationsState } from './destinations.reducer';

export const selectDestinationsState = createFeatureSelector<DestinationsState>('destinations');

export const selectAllDestinations = createSelector(
  selectDestinationsState,
  (state) => state.destinations
);

export const selectSelectedDestination = createSelector(
  selectDestinationsState,
  (state) => state.selectedDestination
);

export const selectDestinationsLoading = createSelector(
  selectDestinationsState,
  (state) => state.loading
);

export const selectDestinationsError = createSelector(
  selectDestinationsState,
  (state) => state.error
);

export const selectPopularDestinations = createSelector(
  selectAllDestinations,
  (destinations) => destinations.filter(d => d.isPopular).slice(0, 6)
);
