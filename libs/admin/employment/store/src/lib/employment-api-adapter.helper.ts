import { DashboardApiResponse } from '@dp/admin/employment/data-access';
import {
  convertDtoToEmploymentStudentCountFilter,
  convertDtoToStudentWithEmployments,
  EmploymentStudentCountFilters,
  StudentWithEmployments,
} from '@dp/admin/employment/types';

export namespace EmploymentApiAdapterHelper {
  export function parseDashboardInfoApiResponse(
    apiResponse: DashboardApiResponse,
  ): ReadonlyArray<StudentWithEmployments> {
    return apiResponse.students.map(dto =>
      convertDtoToStudentWithEmployments(dto),
    );
  }

  export function parseDashboardFiltersApiResponse(
    apiResponse: DashboardApiResponse,
  ): EmploymentStudentCountFilters {
    return convertDtoToEmploymentStudentCountFilter(
      apiResponse.studentStatusesCount,
    );
  }
}
