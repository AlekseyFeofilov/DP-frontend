import { TuiDay } from '@taiga-ui/cdk';

import { StatementStatus, StatementType } from '../enums';

// TODO: убрать
export interface StatementCommon {
  id: string;
  type: StatementType;
  date: TuiDay;
  status: StatementStatus;
}
