import { Company } from '@dp/shared/company/types';
import { Student } from '@dp/shared/student/types';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipCheckStatementStatus } from '../enums/internship-check-statement-status';

export interface InternshipCheckStatement {
  id: string;
  student: Student;
  createDate: TuiDay;
  company: Company;
  vacancy: string;
  comment: string | null;
  status: InternshipCheckStatementStatus;
}
