import { EmploymentVariant } from '@dp/shared/employment-variant/types';

export type NewEmploymentVariant = Omit<EmploymentVariant, 'id'>;
