import { EmploymentStatusDto } from '@dp/admin/employment/dto';
import { getEnumMap } from '@dp/shared/utils';

import { EmploymentStatus } from '../enums';

export const EMPLOYMENT_STATUS_MAP = getEnumMap(
  EmploymentStatusDto,
  EmploymentStatus,
);
