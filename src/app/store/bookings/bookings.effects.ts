// Effects for handling bookings async operations
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { BookingsService } from '../../services/bookings.service';
import * as BookingsActions from './bookings.actions';

@Injectable()
export class BookingsEffects {
  
  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.createBooking),
      switchMap(({ booking }) =>
        this.bookingsService.createBooking(booking).pipe(
          map(createdBooking => BookingsActions.createBookingSuccess({ booking: createdBooking })),
          catchError(error => of(BookingsActions.createBookingFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookingsService: BookingsService
  ) {}
}
