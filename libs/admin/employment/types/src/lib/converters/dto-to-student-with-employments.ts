import {
  StudentWithEmploymnetsDto,
  EmploymentStatusDto,
} from '@dp/admin/employment/dto';

import { EMPLOYMENT_STUDENT_STATUS_MAP } from './employment-student-status-map';
import { convertDtoToEmployment } from './dto-to-employment';
import { StudentWithEmployments } from '../models';

export function convertDtoToStudentWithEmployments(
  dto: StudentWithEmploymnetsDto,
): StudentWithEmployments {
  const activeEmployemnt = dto.employments.find(
    employment => employment.employmentStatus === EmploymentStatusDto.Active,
  );

  return {
    id: dto.userId,
    name: dto.name,
    status: EMPLOYMENT_STUDENT_STATUS_MAP[dto.status],
    group: dto.group?.number || null,
    employment: activeEmployemnt
      ? convertDtoToEmployment(activeEmployemnt)
      : null,
    employmentVariants: [],
  };
}
