import { CompanyDto } from '@dp/shared/company/dto';

export enum InternshipCheckStatementDtoStatus {
  NonVerified = 'NonVerified',
  Accepted = 'Accepted',
  Unactual = 'Unactual',
  Declined = 'Declined ',
}

export interface InternshipCheckStatementDto {
  id: string;
  studentId: string;
  employer: CompanyDto;
  vacancy: string;
  comment?: string | null;
  internshipRequestStatus: InternshipCheckStatementDtoStatus;
}
