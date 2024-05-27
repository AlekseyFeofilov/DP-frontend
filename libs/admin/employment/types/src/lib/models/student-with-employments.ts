import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { Student } from '@dp/shared/student/types';
import { EmploymentStudentStatus } from '../enums';
import { Employment } from './employment';

export interface StudentWithEmployments extends Student {
  status: EmploymentStudentStatus;
  employment: Employment | null;
  employmentVariants: EmploymentVariant[];
}
