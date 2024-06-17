import { convertDtoToFileInfo } from '@dp/shared/file/types';
import { InternshipDiaryStatementDto } from '@dp/shared/statement/dto';
import { convertDtoToStudent } from '@dp/shared/student/types';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipDiaryStatement } from '../model/internship-diary-statement';
import { INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_FROM_DTO } from './internship-diary-statement-status-map';

export function convertDtoToInternshipDiaryStatement(
  dto: InternshipDiaryStatementDto,
): InternshipDiaryStatement {
  return {
    id: dto.id,
    student: convertDtoToStudent(dto.student),
    semester: dto.semester,
    status: INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_FROM_DTO[dto.status],
    files: dto.files.map(convertDtoToFileInfo),
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createDateTime)),
    modifyDate: TuiDay.jsonParse(normalizeDateTime(dto.modifyDateTime)),
    mark: dto.grade ?? null,
  };
}
