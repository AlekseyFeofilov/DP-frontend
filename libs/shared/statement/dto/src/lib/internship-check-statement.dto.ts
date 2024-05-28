import { CompanyDto } from '@dp/shared/company/dto';
import { StudentDto } from '@dp/shared/student/dto';

export enum InternshipCheckStatementDtoStatus {
  NonVerified = 'NonVerified',
  Accepted = 'Accepted',
  Unactual = 'Unactual',
  Declined = 'Declined',
}

export interface InternshipCheckStatementDto {
  id: string;
  student: StudentDto;
  employer: CompanyDto;
  vacancy: string;
  createDateTime: string;
  comment?: string | null;
  internshipRequestStatus: InternshipCheckStatementDtoStatus;
}
