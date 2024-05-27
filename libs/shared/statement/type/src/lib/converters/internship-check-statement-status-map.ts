import { InternshipCheckStatementDtoStatus } from '@dp/shared/statement/dto';
import { getEnumMap } from '@dp/shared/utils';
import { InternshipCheckStatementStatus } from '../enums/internship-check-statement-status';

export const INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_FROM_DTO = getEnumMap(
  InternshipCheckStatementDtoStatus,
  InternshipCheckStatementStatus,
);

export const INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_TO_DTO = getEnumMap(
  InternshipCheckStatementStatus,
  InternshipCheckStatementDtoStatus,
);
