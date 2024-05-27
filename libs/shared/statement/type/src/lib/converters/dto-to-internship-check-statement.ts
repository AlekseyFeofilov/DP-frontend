import { convertDtoToCompany } from '@dp/shared/company/types';
import { InternshipCheckStatementDto } from '@dp/shared/statement/dto';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipCheckStatement } from '../model/internship-check-statement';
import { INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_FROM_DTO } from './internship-check-statement-status-map';

export function convertDtoToInternshipCheckStatement(
  dto: InternshipCheckStatementDto,
): InternshipCheckStatement {
  return {
    id: dto.id,
    student: {
      id: dto.studentId,
      name: '', // TODO
      group: null,
    },
    createDate: TuiDay.currentLocal(), // TODO
    company: convertDtoToCompany(dto.employer),
    vacancy: dto.vacancy,
    comment: dto.comment ?? null,
    status:
      INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_FROM_DTO[
        dto.internshipRequestStatus
      ],
  };
}
