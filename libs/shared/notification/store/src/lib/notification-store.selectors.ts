import { notificationStore } from './notification-store.reducer';

const {
  selectAllNotifications,
  selectUnreadNotificationsQuantity,
  selectStatus,
} = notificationStore;

export const fromNotificationStore = {
  selectAllNotifications,
  selectUnreadNotificationsQuantity,
  selectStatus,
};
