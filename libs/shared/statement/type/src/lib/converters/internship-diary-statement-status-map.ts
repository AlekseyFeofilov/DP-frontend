import { InternshipDiaryStatementDtoStatus } from '@dp/shared/statement/dto';
import { getEnumMap } from '@dp/shared/utils';
import { InternshipDiaryStatementStatus } from '../enums/internship-diary-statement-status';

export const INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_FROM_DTO = getEnumMap(
  InternshipDiaryStatementDtoStatus,
  InternshipDiaryStatementStatus,
);

export const INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_TO_DTO = getEnumMap(
  InternshipDiaryStatementStatus,
  InternshipDiaryStatementDtoStatus,
);
