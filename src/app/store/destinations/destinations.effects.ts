// Effects for handling destination async operations
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { DestinationsService } from '../../services/destinations.service';
import * as DestinationsActions from './destinations.actions';

@Injectable()
export class DestinationsEffects {
  
  loadDestinations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.loadDestinations),
      switchMap(() =>
        this.destinationsService.getDestinations().pipe(
          map(destinations => DestinationsActions.loadDestinationsSuccess({ destinations })),
          catchError(error => of(DestinationsActions.loadDestinationsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private destinationsService: DestinationsService
  ) {}
}
