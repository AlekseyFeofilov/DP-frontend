import { EmploymentVariantStatus } from '../enums/employment-variant-status';

export interface EmploymentVariant {
  id: string;
  priority: number;
  companyName: string;
  comment: string | null;
  vacancy: string;
  status: EmploymentVariantStatus;
}
