import { EmploymentStatus } from '../enums/employment-status';

export interface Employment {
  id: string;
  vacancy: string;
  comment: string | null;
  companyName: string;
  status: EmploymentStatus;
}
