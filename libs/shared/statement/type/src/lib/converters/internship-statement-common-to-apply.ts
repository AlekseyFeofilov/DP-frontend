import { InternshipApplyStatementStatus } from '../enums';
import {
  InternshipApplyStatement,
  InternshipCheckStatement,
  InternshipStatementCommon,
} from '../model';

export function convertInternshipStatementCommonToApply(
  internshipStatementCommon: InternshipStatementCommon,
): InternshipApplyStatement {
  return {
    id: internshipStatementCommon.id,
    student: {
      ...internshipStatementCommon.student,
    },
    createDate: internshipStatementCommon.createDate,
    baseStatement: {
      company: {
        ...internshipStatementCommon.company,
      },
      vacancy: internshipStatementCommon.vacancy,
    } as InternshipCheckStatement,
    status: internshipStatementCommon.status as InternshipApplyStatementStatus,
  };
}
