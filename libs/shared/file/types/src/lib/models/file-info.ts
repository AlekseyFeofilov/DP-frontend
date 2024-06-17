import { TuiDay } from '@taiga-ui/cdk';

export interface FileInfo {
  id: string;
  name: string;
  contentType: string;
  size: number;
  createDate: TuiDay;
}
