import {
  AllInternshipApplyStatementsApiResponse,
  AllInternshipCheckStatementsApiResponse,
  ChangeInternshipApplyStatementStatusApiRequest,
  ChangeInternshipCheckStatementStatusApiRequest,
} from '@dp/admin/statement/data-access';
import {
  INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_TO_DTO,
  INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_TO_DTO,
  InternshipApplyStatement,
  InternshipApplyStatementStatus,
  InternshipCheckStatement,
  InternshipCheckStatementStatus,
  convertDtoToInternshipApplyStatement,
  convertDtoToInternshipCheckStatement,
} from '@dp/shared/statement/type';

export namespace StatementApiAdapterHelper {
  export function parseAllInternshipCheckStatementsApiResponse(
    apiResponse: AllInternshipCheckStatementsApiResponse,
  ): ReadonlyArray<InternshipCheckStatement> {
    return apiResponse.map(statementDto =>
      convertDtoToInternshipCheckStatement(statementDto),
    );
  }

  export function parseChangeInternshipCheckStatementStatusApiRequest(
    statementId: string,
    newStatus: InternshipCheckStatementStatus,
  ): ChangeInternshipCheckStatementStatusApiRequest {
    return {
      statementId,
      newStatus: INTERNSHIP_CHECK_STATEMENT_STATUS_MAP_TO_DTO[newStatus],
    };
  }

  export function parseAllInternshipApplyStatementsApiResponse(
    apiResponse: AllInternshipApplyStatementsApiResponse,
  ): ReadonlyArray<InternshipApplyStatement> {
    return apiResponse.map(statementDto =>
      convertDtoToInternshipApplyStatement(statementDto),
    );
  }

  export function parseChangeInternshipApplyStatementStatusApiRequest(
    statementId: string,
    newStatus: InternshipApplyStatementStatus,
  ): ChangeInternshipApplyStatementStatusApiRequest {
    return {
      statementId,
      newStatus: INTERNSHIP_APPLY_STATEMENT_STATUS_MAP_TO_DTO[newStatus],
    };
  }
}
