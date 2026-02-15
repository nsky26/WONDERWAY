// Actions for testimonials state management
import { createAction, props } from '@ngrx/store';
import { Testimonial } from '../../models/testimonial.model';

export const loadTestimonials = createAction('[Testimonials] Load Testimonials');

export const loadTestimonialsSuccess = createAction(
  '[Testimonials] Load Testimonials Success',
  props<{ testimonials: Testimonial[] }>()
);

export const loadTestimonialsFailure = createAction(
  '[Testimonials] Load Testimonials Failure',
  props<{ error: string }>()
);
