import {
  AllNotificationsApiResponse,
  DeleteNotificationApiRequest,
} from '@dp/shared/notification/data-access';
import {
  Notification,
  convertDtoToNotification,
} from '@dp/shared/notification/types';

export namespace NotificationApiAdapterHelper {
  export function parseAllNotificationsApiResponse(
    apiResponse: AllNotificationsApiResponse,
  ): Array<Notification> {
    return apiResponse.map(convertDtoToNotification);
  }

  export function parseDeleteNotificationApiRequest(
    notification: Notification,
  ): DeleteNotificationApiRequest {
    return { id: notification.id };
  }
}
