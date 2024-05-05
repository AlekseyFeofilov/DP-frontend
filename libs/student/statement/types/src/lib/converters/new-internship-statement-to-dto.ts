import { CreateInternshipStatementDto } from '@dp/student/statement/dto';

import { NewIntrenshipStatement } from '../models';

export function convertNewInternshipStatementToDto(
  newInternshipStatement: NewIntrenshipStatement,
): CreateInternshipStatementDto {
  return {
    employerId: newInternshipStatement.companyId,
    vacancy: newInternshipStatement.vacancy,
    comment: newInternshipStatement.comment,
  };
}
