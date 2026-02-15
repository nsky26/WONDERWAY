// Actions for destination-related state management
import { createAction, props } from '@ngrx/store';
import { Destination } from '../../models/destination.model';

// Load all destinations
export const loadDestinations = createAction('[Destinations] Load Destinations');

export const loadDestinationsSuccess = createAction(
  '[Destinations] Load Destinations Success',
  props<{ destinations: Destination[] }>()
);

export const loadDestinationsFailure = createAction(
  '[Destinations] Load Destinations Failure',
  props<{ error: string }>()
);

// Select a destination
export const selectDestination = createAction(
  '[Destinations] Select Destination',
  props<{ destination: Destination }>()
);

// Clear selected destination
export const clearSelectedDestination = createAction(
  '[Destinations] Clear Selected Destination'
);
