import { InternshipApplyStatementDto } from '@dp/shared/statement/dto';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipApplyStatement } from '../model/internship-apply-statement';
import { convertDtoToInternshipCheckStatement } from './dto-to-internship-check-statement';
import { INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_FROM_DTO } from './internship-apply-statement-status-map';

export function convertDtoToInternshipApplyStatement(
  dto: InternshipApplyStatementDto,
): InternshipApplyStatement {
  return {
    id: dto.id,
    student: {
      id: dto.studentId,
      name: '', // TODO
      group: null,
    },
    createDate: TuiDay.currentLocal(), // TODO
    baseStatement: convertDtoToInternshipCheckStatement(dto.internshipRequest),
    status: INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_FROM_DTO[dto.status],
  };
}
