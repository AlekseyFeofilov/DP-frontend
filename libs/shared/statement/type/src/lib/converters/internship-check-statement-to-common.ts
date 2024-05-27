import { InternshipCheckStatement, InternshipStatementCommon } from '../model';

export function convertInternshipCheckStatementToCommon(
  internshipCheckStatement: InternshipCheckStatement,
): InternshipStatementCommon {
  return {
    id: internshipCheckStatement.id,
    student: {
      ...internshipCheckStatement.student,
    },
    createDate: internshipCheckStatement.createDate,
    company: {
      ...internshipCheckStatement.company,
    },
    vacancy: internshipCheckStatement.vacancy,
    status: internshipCheckStatement.status,
    comment: internshipCheckStatement.comment,
  };
}
