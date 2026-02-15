// Selectors for accessing testimonials state
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestimonialsState } from './testimonials.reducer';

export const selectTestimonialsState = createFeatureSelector<TestimonialsState>('testimonials');

export const selectAllTestimonials = createSelector(
  selectTestimonialsState,
  (state) => state.testimonials
);

export const selectTestimonialsLoading = createSelector(
  selectTestimonialsState,
  (state) => state.loading
);

export const selectTestimonialsError = createSelector(
  selectTestimonialsState,
  (state) => state.error
);
