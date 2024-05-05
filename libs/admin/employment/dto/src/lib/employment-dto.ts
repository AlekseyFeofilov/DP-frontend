import { CompanyDto } from '@dp/admin/company/dto';

export enum EmploymentStatus {
  Active,
  Inactive,
}

export interface EmploymentDto {
  id: string;
  studentId: string;
  employer: CompanyDto;
  internshipRequestId: string | null;
  employmentRequestId: string | null;
  vacancy: string;
  comment: string | null;
  employmentStatus: 'Active';
}
