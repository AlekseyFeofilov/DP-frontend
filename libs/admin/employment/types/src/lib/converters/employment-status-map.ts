import { EmploymentDtoStatus } from '@dp/admin/employment/dto';
import { getEnumMap } from '@dp/shared/utils';

import { EmploymentStatus } from '../enums';

export const EMPLOYMENT_STATUS_MAP_FROM_DTO = getEnumMap(
  EmploymentDtoStatus,
  EmploymentStatus,
);

export const EMPLOYMENT_STATUS_MAP_TO_DTO = getEnumMap(
  EmploymentStatus,
  EmploymentDtoStatus,
);
