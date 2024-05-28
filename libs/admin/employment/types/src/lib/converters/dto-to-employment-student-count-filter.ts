import {
  EmploymentStudentDtoStatus,
  EmploymentStudentStatusCountDto,
} from '@dp/admin/employment/dto';
import { EmploymentStudentCountFilters } from '../models';

export function convertDtoToEmploymentStudentCountFilter(
  dto: Array<EmploymentStudentStatusCountDto>,
): EmploymentStudentCountFilters {
  return {
    all: dto.reduce((prev, curr) => (prev += curr.count), 0),
    inProcess: dto.reduce(
      (prev, curr) =>
        (prev += ![
          EmploymentStudentDtoStatus.Non,
          EmploymentStudentDtoStatus.Employed,
        ].includes(curr.studentStatus)
          ? curr.count
          : 0),
      0,
    ),
    noActivity: dto.reduce(
      (prev, curr) =>
        (prev +=
          curr.studentStatus === EmploymentStudentDtoStatus.Non
            ? curr.count
            : 0),
      0,
    ),
    done: dto.reduce(
      (prev, curr) =>
        (prev +=
          curr.studentStatus === EmploymentStudentDtoStatus.Employed
            ? curr.count
            : 0),
      0,
    ),
  };
}
