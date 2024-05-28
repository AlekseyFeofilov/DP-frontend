import { convertDtoToCompany } from '@dp/shared/company/types';
import { InternshipCheckStatementDto } from '@dp/shared/statement/dto';
import { convertDtoToStudent } from '@dp/shared/student/types';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipCheckStatement } from '../model/internship-check-statement';
import { INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_FROM_DTO } from './internship-check-statement-status-map';

export function convertDtoToInternshipCheckStatement(
  dto: InternshipCheckStatementDto,
): InternshipCheckStatement {
  return {
    id: dto.id,
    student: convertDtoToStudent(dto.student),
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createDateTime)),
    company: convertDtoToCompany(dto.employer),
    vacancy: dto.vacancy,
    comment: dto.comment ?? null,
    status:
      INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_FROM_DTO[
        dto.internshipRequestStatus
      ],
  };
}
