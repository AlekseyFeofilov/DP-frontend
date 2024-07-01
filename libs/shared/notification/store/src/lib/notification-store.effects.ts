import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { alertActions } from '@dp/shared/effects';
import { NotificationApiService } from '@dp/shared/notification/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { NotificationApiAdapterHelper } from './notification-api-adapter.helper';
import { notificationActions } from './notification-store.actions';

@Injectable()
export class NotificationStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly notificationApiService = inject(NotificationApiService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationActions.loadAll),
      switchMap(() =>
        this.notificationApiService.getAll().pipe(
          map(response => {
            const notifications =
              NotificationApiAdapterHelper.parseAllNotificationsApiResponse(
                response,
              );

            return notificationActions.loadAllSuccess({
              notifications,
            });
          }),
        ),
      ),
    ),
  );

  loadUnreadQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationActions.loadUnreadQuantity),
      switchMap(() =>
        this.notificationApiService.getUnreadQuntity().pipe(
          map(response =>
            notificationActions.loadQuantitySuccess({
              unreadNotificationsQuantity: response,
            }),
          ),
        ),
      ),
    ),
  );

  remove$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.remove),
        mergeMap(({ notification }) =>
          this.notificationApiService
            .delete(
              NotificationApiAdapterHelper.parseDeleteNotificationApiRequest(
                notification,
              ),
            )
            .pipe(
              catchError(() =>
                of(
                  alertActions.error({
                    label: NOTIFICATION_TEXTS.remove.error,
                    message: NOTIFICATION_DESCRIPTION.error,
                  }),
                ),
              ),
            ),
        ),
      ),
    { dispatch: false },
  );
}
