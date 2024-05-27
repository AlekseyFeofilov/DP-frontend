import { Student } from '@dp/shared/student/types';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipApplyStatementStatus } from '../enums/internship-apply-statement-status';
import { InternshipCheckStatement } from './internship-check-statement';

export interface InternshipApplyStatement {
  id: string;
  student: Student;
  createDate: TuiDay;
  baseStatement: InternshipCheckStatement;
  status: InternshipApplyStatementStatus;
}
