// Reducer for managing testimonials state
import { createReducer, on } from '@ngrx/store';
import { Testimonial } from '../../models/testimonial.model';
import * as TestimonialsActions from './testimonials.actions';

export interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

export const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null
};

export const testimonialsReducer = createReducer(
  initialState,
  
  on(TestimonialsActions.loadTestimonials, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(TestimonialsActions.loadTestimonialsSuccess, (state, { testimonials }) => ({
    ...state,
    testimonials,
    loading: false,
    error: null
  })),
  
  on(TestimonialsActions.loadTestimonialsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
