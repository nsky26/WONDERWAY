// Reducer for managing offers state
import { createReducer, on } from '@ngrx/store';
import { Offer } from '../../models/offer.model';
import * as OffersActions from './offers.actions';

export interface OffersState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
}

export const initialState: OffersState = {
  offers: [],
  loading: false,
  error: null
};

export const offersReducer = createReducer(
  initialState,
  
  on(OffersActions.loadOffers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(OffersActions.loadOffersSuccess, (state, { offers }) => ({
    ...state,
    offers,
    loading: false,
    error: null
  })),
  
  on(OffersActions.loadOffersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
