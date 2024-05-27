import { Company } from '@dp/shared/company/types';
import { EmploymentVariant } from '@dp/shared/employment-variant/types';

export type NewEmploymentVariant = Omit<EmploymentVariant, 'id' | 'company'> & {
  company: Pick<Company, 'id' | 'name'>;
};
