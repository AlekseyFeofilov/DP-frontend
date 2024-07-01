import { Notification } from '@dp/shared/notification/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface NotificationStoreState {
  readonly allNotifications: ReadonlyArray<Notification>;
  readonly unreadNotificationsQuantity: number;
  readonly status: StoreStateStatus;
}
