import { Employment } from './employment';
import { EmploymentVariant } from './employment-variant';

export interface StudentWithEmployments {
  id: string;
  name: string;
  group: string;
  employment?: Employment;
  employmentVariants: EmploymentVariant[];
}
