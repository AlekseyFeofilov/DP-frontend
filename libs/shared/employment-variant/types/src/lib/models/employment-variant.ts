import { Company } from '@dp/shared/company/types';
import { EmploymentVariantStatus } from '../enums/employment-variant-status';

export interface EmploymentVariant {
  id: string;
  priority: number;
  company: Pick<Company, 'id' | 'name'>;
  comment: string | null;
  vacancy: string;
  status: EmploymentVariantStatus;
}
