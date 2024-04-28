import { createAction, props } from '@ngrx/store';

export interface NotificationProps {
  readonly message: string;
  readonly label?: string;
}

const success = createAction(
  `[Notification] show success notification`,
  props<NotificationProps>(),
);

const error = createAction(
  `[Notification] show error notification`,
  props<NotificationProps>(),
);

export const notificationActions = {
  success,
  error,
};
