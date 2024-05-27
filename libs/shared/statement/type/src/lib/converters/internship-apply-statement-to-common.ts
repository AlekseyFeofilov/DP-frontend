import { InternshipApplyStatement, InternshipStatementCommon } from '../model';

export function convertInternshipApplyStatementToCommon(
  internshipApplyStatement: InternshipApplyStatement,
): InternshipStatementCommon {
  return {
    id: internshipApplyStatement.id,
    student: {
      ...internshipApplyStatement.student,
    },
    createDate: internshipApplyStatement.createDate,
    company: {
      ...internshipApplyStatement.baseStatement.company,
    },
    vacancy: internshipApplyStatement.baseStatement.vacancy,
    status: internshipApplyStatement.status,
    comment: internshipApplyStatement.baseStatement.comment,
  };
}
