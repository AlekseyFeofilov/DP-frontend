import {
  AllInternshipDiaryStatementsApiResponse,
  ChangInternshipeDiaryMarkApiRequest,
  ChangInternshipeDiaryStatementStatusApiRequest,
  InternshipDiaryStatementByIdApiResponse,
} from '@dp/admin/diary/data-access';
import {
  INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_TO_DTO,
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
  convertDtoToInternshipDiaryStatement,
} from '@dp/shared/statement/type';

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
  ): ChangInternshipeDiaryStatementStatusApiRequest {
    return {
      id,
      status: INTERNSHIP_DIARY_STATEMENT_STATUS_MAP_TO_DTO[status],
    };
  }

  export function parseChangeInternshipDiaryMarkApiRequest(
    id: string,
    mark: number,
  ): ChangInternshipeDiaryMarkApiRequest {
    return {
      id,
      mark,
    };
  }
}
