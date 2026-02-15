// Selectors for accessing offers state
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OffersState } from './offers.reducer';

export const selectOffersState = createFeatureSelector<OffersState>('offers');

export const selectAllOffers = createSelector(
  selectOffersState,
  (state) => state.offers
);

export const selectOffersLoading = createSelector(
  selectOffersState,
  (state) => state.loading
);

export const selectOffersError = createSelector(
  selectOffersState,
  (state) => state.error
);
