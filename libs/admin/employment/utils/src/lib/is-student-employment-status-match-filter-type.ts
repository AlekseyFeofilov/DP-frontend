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
        EmploymentStudentStatus.None,
      ].includes(status);
    case 'noActivity':
      return status === EmploymentStudentStatus.None;
    case 'done':
      return status === EmploymentStudentStatus.Employed;
  }
}
