import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { notificationActions } from './notification-store.actions';
import { NotificationStoreState } from './notification-store.interface';
import { NOTIFICATION_STORE_FEATURE_KEY } from './notification-store.key';

const initalState: NotificationStoreState = {
  allNotifications: [],
  unreadNotificationsQuantity: 0,
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(notificationActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(notificationActions.loadAllSuccess, (state, { notifications }) => ({
    ...state,
    allNotifications: notifications,
    status: StoreStateStatus.Loaded,
  })),

  on(
    notificationActions.loadQuantitySuccess,
    (state, { unreadNotificationsQuantity }) => ({
      ...state,
      unreadNotificationsQuantity,
    }),
  ),

  on(notificationActions.remove, (state, { notification }) => ({
    ...state,
    allNotifications: state.allNotifications.filter(
      n => n.id !== notification.id,
    ),
  })),
);

export const notificationStore = createFeature({
  name: NOTIFICATION_STORE_FEATURE_KEY,
  reducer,
});
