// Actions for offers state management
import { createAction, props } from '@ngrx/store';
import { Offer } from '../../models/offer.model';

export const loadOffers = createAction('[Offers] Load Offers');

export const loadOffersSuccess = createAction(
  '[Offers] Load Offers Success',
  props<{ offers: Offer[] }>()
);

export const loadOffersFailure = createAction(
  '[Offers] Load Offers Failure',
  props<{ error: string }>()
);
