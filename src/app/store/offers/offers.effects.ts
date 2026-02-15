// Effects for handling offers async operations
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { OffersService } from '../../services/offers.service';
import * as OffersActions from './offers.actions';

@Injectable()
export class OffersEffects {
  
  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.loadOffers),
      switchMap(() =>
        this.offersService.getOffers().pipe(
          map(offers => OffersActions.loadOffersSuccess({ offers })),
          catchError(error => of(OffersActions.loadOffersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private offersService: OffersService
  ) {}
}
