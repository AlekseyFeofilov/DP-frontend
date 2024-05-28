import { InternshipApplyStatementDto } from '@dp/shared/statement/dto';
import { convertDtoToStudent } from '@dp/shared/student/types';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipApplyStatement } from '../model/internship-apply-statement';
import { convertDtoToInternshipCheckStatement } from './dto-to-internship-check-statement';
import { INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_FROM_DTO } from './internship-apply-statement-status-map';

export function convertDtoToInternshipApplyStatement(
  dto: InternshipApplyStatementDto,
): InternshipApplyStatement {
  return {
    id: dto.id,
    student: convertDtoToStudent(dto.student),
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createDateTime)),
    baseStatement: convertDtoToInternshipCheckStatement(dto.internshipRequest),
    status: INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_FROM_DTO[dto.status],
  };
}
