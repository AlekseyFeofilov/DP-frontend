import { Company } from '@dp/shared/company/types';
import { Student } from '@dp/shared/student/types';
import { TuiDay } from '@taiga-ui/cdk';
import {
  InternshipApplyStatementStatus,
  InternshipCheckStatementStatus,
} from '../enums';

export interface InternshipStatementCommon {
  id: string;
  student: Student;
  createDate: TuiDay;
  company: Company;
  vacancy: string;
  status: InternshipCheckStatementStatus | InternshipApplyStatementStatus;
  comment: string | null;
}
