import {
  InternshipApplyStatement,
  InternshipCheckStatement,
} from '@dp/shared/statement/type';
import { TuiDay } from '@taiga-ui/cdk';
import { Employment } from './employment';

export interface EmploymentChain {
  date: TuiDay;
  employment: Employment | null;
  internshipApplyStatement: InternshipApplyStatement | null;
  internshipCheckStatement: InternshipCheckStatement | null;
}
