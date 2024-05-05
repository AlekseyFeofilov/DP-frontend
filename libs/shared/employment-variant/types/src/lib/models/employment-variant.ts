import { EmploymentVariantStatus } from '../enums/employment-variant-status';

export interface EmploymentVariant {
  priority: number;
  companyName: string;
  comment?: string;
  vacancy: string;
  status: EmploymentVariantStatus;
}
