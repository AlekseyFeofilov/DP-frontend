import { TuiDay } from '@taiga-ui/cdk';

export interface Notification {
  id: string;
  title: string;
  message: string;
  addresseeId: string;
  link: string;
  isRead: boolean;
  createDate: TuiDay;
}
