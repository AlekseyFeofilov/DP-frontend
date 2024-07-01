import { NotificationDto } from '@dp/shared/notification/dto';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { Notification } from '../models/notification';

export function convertDtoToNotification(dto: NotificationDto): Notification {
  return {
    id: dto.id,
    title: dto.title,
    message: dto.message,
    addresseeId: dto.addresseeId,
    link: dto.link,
    isRead: dto.isRead,
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createDateTime)),
  };
}
