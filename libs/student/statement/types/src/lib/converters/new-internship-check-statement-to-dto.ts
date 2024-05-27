import { CreateInternshipCheckStatementDto } from '@dp/student/statement/dto';

import { NewIntrenshipCheckStatement } from '../models';

export function convertNewInternshipCheckStatementToDto(
  newInternshipCheckStatement: NewIntrenshipCheckStatement,
): CreateInternshipCheckStatementDto {
  return {
    employerId: newInternshipCheckStatement.companyId,
    vacancy: newInternshipCheckStatement.vacancy,
    comment: newInternshipCheckStatement.comment,
  };
}
