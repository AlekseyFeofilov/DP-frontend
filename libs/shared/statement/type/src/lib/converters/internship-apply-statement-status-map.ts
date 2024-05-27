import { InternshipApplyStatementDtoStatus } from '@dp/shared/statement/dto';
import { getEnumMap } from '@dp/shared/utils';
import { InternshipApplyStatementStatus } from '../enums';

export const INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_FROM_DTO = getEnumMap(
  InternshipApplyStatementDtoStatus,
  InternshipApplyStatementStatus,
);

export const INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_TO_DTO = getEnumMap(
  InternshipApplyStatementStatus,
  InternshipApplyStatementDtoStatus,
);
