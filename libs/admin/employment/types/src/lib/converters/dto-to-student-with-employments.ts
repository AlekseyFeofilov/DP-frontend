import {
  EmploymentDtoStatus,
  StudentWithEmploymnetsDto,
} from '@dp/admin/employment/dto';
import { convertDtoToEmploymentVariant } from '@dp/shared/employment-variant/types';
import { convertDtoToStudent } from '@dp/shared/student/types';
import { StudentWithEmployments } from '../models';
import { convertDtoToEmployment } from './dto-to-employment';
import { EMPLOYMENT_STUDENT_STATUS_MAP_FROM_DTO } from './employment-student-status-map';

export function convertDtoToStudentWithEmployments(
  dto: StudentWithEmploymnetsDto,
): StudentWithEmployments {
  const activeEmployemnt = dto.employments.find(
    employment => employment.employmentStatus === EmploymentDtoStatus.Active,
  );

  return {
    ...convertDtoToStudent(dto),
    status: EMPLOYMENT_STUDENT_STATUS_MAP_FROM_DTO[dto.status],
    employment: activeEmployemnt
      ? convertDtoToEmployment(activeEmployemnt)
      : null,
    employmentVariants: dto.employmentVariants.map(variant =>
      convertDtoToEmploymentVariant(variant),
    ),
  };
}
