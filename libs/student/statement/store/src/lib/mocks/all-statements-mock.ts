import {
  StatementCommon,
  StatementStatus,
  StatementType,
} from '@dp/student/statement/types';
import { TuiDay } from '@taiga-ui/cdk';

export const statementsMock: ReadonlyArray<StatementCommon> = [
  {
    id: '1',
    type: StatementType.Employment,
    status: StatementStatus.Declined,
    date: TuiDay.currentLocal(),
  },
  {
    id: '3',
    type: StatementType.Internship,
    status: StatementStatus.Accepted,
    date: TuiDay.jsonParse('2023-01-10'),
  },
];
