import {
  EmploymentStatusDto,
  StudentWithEmploymnetsDto,
} from '@dp/admin/employment/dto';

import { StudentWithEmployments } from '../models';
import { convertDtoToEmployment } from './dto-to-employment';
import { EMPLOYMENT_STATUS_MAP } from './employment-status-map';

export function convertDtoToStudentWithEmployments(
  dto: StudentWithEmploymnetsDto,
): StudentWithEmployments {
  const activeEmployemnt = dto.employments.find(
    employment => employment.employmentStatus === EmploymentStatusDto.Active,
  );

  return {
    id: dto.userId,
    name: dto.name,
    status: EMPLOYMENT_STATUS_MAP[dto.status],
    group: dto.group?.number || null,
    employment: activeEmployemnt
      ? convertDtoToEmployment(activeEmployemnt)
      : null,
    employmentVariants: [],
  };
}
