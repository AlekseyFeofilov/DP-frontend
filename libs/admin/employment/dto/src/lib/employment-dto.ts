import { CompanyDto } from '@dp/shared/company/dto';

export enum EmploymentDtoStatus {
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
  employmentStatus: EmploymentDtoStatus;
}
