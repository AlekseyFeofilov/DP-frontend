import { createAction, props } from '@ngrx/store';

export interface AlertProps {
  readonly message: string;
  readonly label?: string;
}

const success = createAction(
  `[Notification] show success alert`,
  props<AlertProps>(),
);

const error = createAction(
  `[Notification] show error alert`,
  props<AlertProps>(),
);

export const alertActions = {
  success,
  error,
};
