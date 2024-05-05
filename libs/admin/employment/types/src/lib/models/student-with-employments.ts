import { EmploymentVariant } from '@dp/shared/employment-variant/types';

import { EmploymentStudentStatus } from '../enums';
import { Employment } from './employment';

export interface StudentWithEmployments {
  id: string;
  name: string;
  status: EmploymentStudentStatus;
  group: number | null;
  employment: Employment | null;
  employmentVariants: EmploymentVariant[];
}
