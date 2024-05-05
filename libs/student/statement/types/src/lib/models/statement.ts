import { TuiDay } from '@taiga-ui/cdk';
import { StatementStatus, StatementType } from '../enums';

export interface StatementCommon {
  id: string;
  type: StatementType;
  date: TuiDay;
  status: StatementStatus;
}
