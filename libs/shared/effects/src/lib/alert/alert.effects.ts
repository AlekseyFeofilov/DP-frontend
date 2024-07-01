import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TuiAlertService } from '@taiga-ui/core';
import { switchMap } from 'rxjs';
import { alertActions } from './alert.actions';

@Injectable()
export class AlertEffects {
  private readonly actions$ = inject(Actions);
  private readonly alertService = inject(TuiAlertService);

  showSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(alertActions.success),
        switchMap(({ message, label }) =>
          this.alertService.open(message, {
            status: 'success',
            label,
          }),
        ),
      ),
    { dispatch: false },
  );

  showErrorNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(alertActions.error),
        switchMap(({ message, label }) =>
          this.alertService.open(message, {
            status: 'error',
            label,
          }),
        ),
      ),
    { dispatch: false },
  );
}
