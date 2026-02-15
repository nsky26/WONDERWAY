// Reducer for managing destination state
import { createReducer, on } from '@ngrx/store';
import { Destination } from '../../models/destination.model';
import * as DestinationsActions from './destinations.actions';

export interface DestinationsState {
  destinations: Destination[];
  selectedDestination: Destination | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DestinationsState = {
  destinations: [],
  selectedDestination: null,
  loading: false,
  error: null
};

export const destinationsReducer = createReducer(
  initialState,
  
  // Load destinations
  on(DestinationsActions.loadDestinations, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) => ({
    ...state,
    destinations,
    loading: false,
    error: null
  })),
  
  on(DestinationsActions.loadDestinationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select destination
  on(DestinationsActions.selectDestination, (state, { destination }) => ({
    ...state,
    selectedDestination: destination
  })),
  
  // Clear selected destination
  on(DestinationsActions.clearSelectedDestination, (state) => ({
    ...state,
    selectedDestination: null
  }))
);
