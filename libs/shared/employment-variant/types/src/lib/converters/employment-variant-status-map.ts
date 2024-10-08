import { EmploymentVariantDtoStatus } from '@dp/shared/employment-variant/dto';
import { getEnumMap } from '@dp/shared/utils';

import { EmploymentVariantStatus } from '../enums';

export const EMPLOYMENT_VARIANT_STATUS_MAP_FROM_DTO = getEnumMap(
  EmploymentVariantDtoStatus,
  EmploymentVariantStatus,
);

export const EMPLOYMENT_VARIANT_STATUS_MAP_TO_DTO = getEnumMap(
  EmploymentVariantStatus,
  EmploymentVariantDtoStatus,
);
