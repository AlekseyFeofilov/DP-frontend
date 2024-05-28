import { StudentDto } from '@dp/shared/student/dto';
import { InternshipCheckStatementDto } from './internship-check-statement.dto';

export enum InternshipApplyStatementDtoStatus {
  NonVerified = 'NonVerified',
  Accepted = 'Accepted',
  Unactual = 'UnActual',
  Declined = 'Declined',
}

export interface InternshipApplyStatementDto {
  id: string;
  student: StudentDto;
  internshipRequest: InternshipCheckStatementDto;
  status: InternshipApplyStatementDtoStatus;
  createDateTime: string;
}
