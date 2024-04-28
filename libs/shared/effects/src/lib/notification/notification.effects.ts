import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { switchMap } from 'rxjs';

import { notificationActions } from './notification.actions';

@Injectable()
export class NotificationEffects {
  private readonly actions$ = inject(Actions);
  private readonly alertService = inject(TuiAlertService);

  showSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.success),
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
        ofType(notificationActions.error),
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
