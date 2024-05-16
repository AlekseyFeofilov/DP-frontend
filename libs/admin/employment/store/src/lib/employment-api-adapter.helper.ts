import {
  convertDtoToStudentWithEmployments,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { DashboardApiResponse } from '@dp/admin/employment/data-access';

export namespace EmploymentApiAdapterHelper {
  export function parseDashboardInfoApiResponse(
    apiResponse: DashboardApiResponse,
  ): ReadonlyArray<StudentWithEmployments> {
    return apiResponse.students.map(dto =>
      convertDtoToStudentWithEmployments(dto),
    );
  }
}
