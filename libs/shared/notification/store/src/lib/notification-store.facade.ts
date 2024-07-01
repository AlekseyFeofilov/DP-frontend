import { Injectable, inject } from '@angular/core';
import { Notification } from '@dp/shared/notification/types';
import { StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { notificationActions } from './notification-store.actions';
import { fromNotificationStore } from './notification-store.selectors';

@Injectable()
export class NotificationStoreFacade {
  private readonly store = inject(Store);

  readonly notifications$ = this.store.pipe(
    select(fromNotificationStore.selectAllNotifications),
  );
  readonly unreadNotificationsQuantity$ = this.store.pipe(
    select(fromNotificationStore.selectUnreadNotificationsQuantity),
  );

  readonly status$ = this.store.pipe(
    select(fromNotificationStore.selectStatus),
  );
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(notificationActions.loadAll());
  }

  loadUnreadQuantity(): void {
    this.store.dispatch(notificationActions.loadUnreadQuantity());
  }

  remove(notification: Notification) {
    this.store.dispatch(notificationActions.remove({ notification }));
  }
}
