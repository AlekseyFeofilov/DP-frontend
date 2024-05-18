import { EmploymentStudentDtoStatus } from '@dp/admin/employment/dto';
import { getEnumMap } from '@dp/shared/utils';

import { EmploymentStudentStatus } from '../enums';

export const EMPLOYMENT_STUDENT_STATUS_MAP = getEnumMap(
  EmploymentStudentDtoStatus,
  EmploymentStudentStatus,
);
