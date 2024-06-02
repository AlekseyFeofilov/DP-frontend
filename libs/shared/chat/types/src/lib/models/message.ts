import { TuiDay } from '@taiga-ui/cdk';

export interface Message {
  id: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  content: string;
  createDate: TuiDay;
  isMy: boolean;
}
