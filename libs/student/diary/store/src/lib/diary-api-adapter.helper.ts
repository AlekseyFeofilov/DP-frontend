import {
  INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_TO_DTO,
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
  convertDtoToInternshipDiaryStatement,
} from '@dp/shared/statement/type';
import {
  AllInternshipDiaryStatementsApiResponse,
  ChangeInternshipDiaryStatementStatusApiRequest,
  CreateInternshipDiaryStatementApiRequest,
  CreateInternshipDiaryTempalteApiRequest,
  DeleteInternshipDiaryStatementStatusApiRequest,
  InternshipDiaryStatementByIdApiResponse,
} from '@dp/student/diary/data-access';
import {
  NewInternshipDiaryTemplate,
  convertNewInternshipDiaryTemplateToDto,
} from '@dp/student/diary/types';
import {
  NewIntrenshipDiaryStatement,
  convertNewInternshipDiaryStatementToDto,
} from '@dp/student/statement/types';

export namespace DiaryApiAdapterHelper {
  export function parseAllInternshipDiaryStatementsApiResponse(
    apiResponse: AllInternshipDiaryStatementsApiResponse,
  ): InternshipDiaryStatement[] {
    return apiResponse.map(dto => convertDtoToInternshipDiaryStatement(dto));
  }

  export function parseInternshipDiaryStatementByIdApiResponse(
    apiResponse: InternshipDiaryStatementByIdApiResponse,
  ): InternshipDiaryStatement {
    return convertDtoToInternshipDiaryStatement(apiResponse);
  }

  export function parseChangeInternshipDiaryStatementStatusApiRequest(
    id: string,
    status: InternshipDiaryStatementStatus,
  ): ChangeInternshipDiaryStatementStatusApiRequest {
    return {
      id,
      status: INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_TO_DTO[status],
    };
  }

  export function parseCreateInternshipDiaryStatementApiRequest(
    newIntrenshipDiaryStatement: NewIntrenshipDiaryStatement,
  ): CreateInternshipDiaryStatementApiRequest {
    return {
      payload: convertNewInternshipDiaryStatementToDto(
        newIntrenshipDiaryStatement,
      ),
    };
  }

  export function parseDeleteInternshipDiaryStatementStatusApiRequest(
    id: string,
  ): DeleteInternshipDiaryStatementStatusApiRequest {
    return {
      id,
    };
  }

  export function parseCreateInternshipDiaryTempalteApiRequestApiRequest(
    semester: number,
    newInternshipDiaryTemplate: NewInternshipDiaryTemplate,
  ): CreateInternshipDiaryTempalteApiRequest {
    return {
      semester,
      payload: convertNewInternshipDiaryTemplateToDto(
        newInternshipDiaryTemplate,
      ),
    };
  }
}
