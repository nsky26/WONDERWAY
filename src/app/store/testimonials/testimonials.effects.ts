// Effects for handling testimonials async operations
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { TestimonialsService } from '../../services/testimonials.service';
import * as TestimonialsActions from './testimonials.actions';

@Injectable()
export class TestimonialsEffects {
  
  loadTestimonials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.loadTestimonials),
      switchMap(() =>
        this.testimonialsService.getTestimonials().pipe(
          map(testimonials => TestimonialsActions.loadTestimonialsSuccess({ testimonials })),
          catchError(error => of(TestimonialsActions.loadTestimonialsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private testimonialsService: TestimonialsService
  ) {}
}
