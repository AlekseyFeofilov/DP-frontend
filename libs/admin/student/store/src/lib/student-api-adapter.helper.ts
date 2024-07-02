import {
  EmploymentChain,
  StudentWithEmployments,
  convertDtoToEmployment,
  convertDtoToStudentWithEmployments,
} from '@dp/admin/employment/types';
import {
  AllStudentsApiResponse,
  StudentByIdApiResponse,
  StudentEmploymentHistoryApiResponse,
  StudentInternshipDiariesApiResponse,
} from '@dp/admin/student/data-access';
import {
  InternshipDiaryStatement,
  convertDtoToInternshipApplyStatement,
  convertDtoToInternshipCheckStatement,
  convertDtoToInternshipDiaryStatement,
} from '@dp/shared/statement/type';
import { TuiDay } from '@taiga-ui/cdk';

export namespace StudentApiAdapterHelper {
  export function parseAllStudentsApiResponse(
    apiResponse: AllStudentsApiResponse,
  ): StudentWithEmployments[] {
    return apiResponse.map(dto => convertDtoToStudentWithEmployments(dto));
  }

  export function parseStudentByIdApiResponseApiResponse(
    apiResponse: StudentByIdApiResponse,
  ): StudentWithEmployments {
    return convertDtoToStudentWithEmployments(apiResponse);
  }

  export function parseEmploymentHistoryApiResponse(
    apiResponse: StudentEmploymentHistoryApiResponse,
  ): EmploymentChain[] {
    return apiResponse.map(dto => ({
      date: TuiDay.jsonParse(dto.date),
      employment: dto.object.employment
        ? convertDtoToEmployment(dto.object.employment)
        : null,
      internshipApplyStatement: dto.object.employmentRequest
        ? convertDtoToInternshipApplyStatement(dto.object.employmentRequest)
        : null,
      internshipCheckStatement: dto.object.internshipRequest
        ? convertDtoToInternshipCheckStatement(dto.object.internshipRequest)
        : null,
    }));
  }

  export function parseInternshipDiariesApiResponse(
    apiResponse: StudentInternshipDiariesApiResponse,
  ): InternshipDiaryStatement[] {
    return apiResponse.map(convertDtoToInternshipDiaryStatement);
  }
}
