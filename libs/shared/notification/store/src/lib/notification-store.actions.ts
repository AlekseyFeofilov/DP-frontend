import { Notification } from '@dp/shared/notification/types';
import { createAction, props } from '@ngrx/store';
import { NOTIFICATION_STORE_FEATURE_KEY } from './notification-store.key';

const loadAll = createAction(
  `[${NOTIFICATION_STORE_FEATURE_KEY}] load  notifications`,
);

const loadUnreadQuantity = createAction(
  `[${NOTIFICATION_STORE_FEATURE_KEY}] load unread notifications quantity`,
);

const loadAllSuccess = createAction(
  `[${NOTIFICATION_STORE_FEATURE_KEY}] load all notifications success`,
  props<{ readonly notifications: ReadonlyArray<Notification> }>(),
);

const loadQuantitySuccess = createAction(
  `[${NOTIFICATION_STORE_FEATURE_KEY}] load notifications quantity success`,
  props<{ readonly unreadNotificationsQuantity: number }>(),
);

const remove = createAction(
  `[${NOTIFICATION_STORE_FEATURE_KEY}] remove notification`,
  props<{ readonly notification: Notification }>(),
);

export const notificationActions = {
  loadAll,
  loadAllSuccess,
  loadQuantitySuccess,
  remove,
  loadUnreadQuantity,
};
