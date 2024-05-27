import { InternshipCheckStatementStatus } from '../enums';
import { InternshipCheckStatement, InternshipStatementCommon } from '../model';

export function convertInternshipStatementCommonToCheck(
  internshipStatementCommon: InternshipStatementCommon,
): InternshipCheckStatement {
  return {
    id: internshipStatementCommon.id,
    student: {
      ...internshipStatementCommon.student,
    },
    createDate: internshipStatementCommon.createDate,
    company: {
      ...internshipStatementCommon.company,
    },
    vacancy: internshipStatementCommon.vacancy,
    status: internshipStatementCommon.status as InternshipCheckStatementStatus,
    comment: internshipStatementCommon.comment,
  };
}
