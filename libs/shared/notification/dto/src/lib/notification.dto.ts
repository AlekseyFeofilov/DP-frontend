export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  addresseeId: string;
  link: string;
  isRead: boolean;
  createDateTime: string;
}
