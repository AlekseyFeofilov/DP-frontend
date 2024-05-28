import {
  EmploymentStudentCountFilterType,
  EmploymentStudentStatus,
} from '@dp/admin/employment/types';

export function isStudentEmploymentStatusMatchFilterType(
  status: EmploymentStudentStatus,
  filterType: EmploymentStudentCountFilterType,
): boolean {
  switch (filterType) {
    case 'all':
      return true;
    case 'inProcess':
      return ![
        EmploymentStudentStatus.Employed,
        EmploymentStudentStatus.Non,
      ].includes(status);
    case 'noActivity':
      return status === EmploymentStudentStatus.Non;
    case 'done':
      return status === EmploymentStudentStatus.Employed;
  }
}
