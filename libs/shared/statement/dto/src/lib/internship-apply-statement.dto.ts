import { InternshipCheckStatementDto } from './internship-check-statement.dto';

export enum InternshipApplyStatementDtoStatus {
  NonVerified = 'NonVerified',
  Accepted = 'Accepted',
  Unactual = 'UnActual',
  Declined = 'Declined',
}

export interface InternshipApplyStatementDto {
  id: string;
  studentId: string;
  internshipRequest: InternshipCheckStatementDto;
  status: InternshipApplyStatementDtoStatus;
}
