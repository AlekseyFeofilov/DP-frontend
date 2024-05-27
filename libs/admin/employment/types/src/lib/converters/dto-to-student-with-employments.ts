import {
  EmploymentDtoStatus,
  StudentWithEmploymnetsDto,
} from '@dp/admin/employment/dto';
import { convertDtoToStudent } from '@dp/shared/student/types';
import { StudentWithEmployments } from '../models';
import { convertDtoToEmployment } from './dto-to-employment';
import { EMPLOYMENT_STUDENT_STATUS_MAP } from './employment-student-status-map';

export function convertDtoToStudentWithEmployments(
  dto: StudentWithEmploymnetsDto,
): StudentWithEmployments {
  const activeEmployemnt = dto.employments.find(
    employment => employment.employmentStatus === EmploymentDtoStatus.Active,
  );

  return {
    ...convertDtoToStudent(dto),
    status: EMPLOYMENT_STUDENT_STATUS_MAP[dto.status],
    employment: activeEmployemnt
      ? convertDtoToEmployment(activeEmployemnt)
      : null,
    employmentVariants: [],
  };
}
