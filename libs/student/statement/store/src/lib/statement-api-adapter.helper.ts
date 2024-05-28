import {
  InternshipApplyStatement,
  InternshipCheckStatement,
  convertDtoToInternshipApplyStatement,
  convertDtoToInternshipCheckStatement,
} from '@dp/shared/statement/type';
import {
  AllInternshipApplyStatementsApiResponse,
  AllInternshipCheckStatementsApiResponse,
  CreateInternshipApplyStatementApiRequest,
  CreateInternshipCheckStatementApiRequest,
} from '@dp/student/statement/data-access';
import {
  NewIntrenshipCheckStatement,
  convertNewInternshipCheckStatementToDto,
} from '@dp/student/statement/types';

export namespace StatementApiAdapterHelper {
  export function parseAllInternshipCheckStatementsApiResponse(
    apiResponse: AllInternshipCheckStatementsApiResponse,
  ): ReadonlyArray<InternshipCheckStatement> {
    return apiResponse.map(statementDto =>
      convertDtoToInternshipCheckStatement(statementDto),
    );
  }

  export function parseCreateInternshipCheckStatementApiRequest(
    newInternshipCheckStatement: NewIntrenshipCheckStatement,
  ): CreateInternshipCheckStatementApiRequest {
    return {
      payload: convertNewInternshipCheckStatementToDto(
        newInternshipCheckStatement,
      ),
    };
  }

  export function parseAllInternshipApplyStatementsApiResponse(
    apiResponse: AllInternshipApplyStatementsApiResponse,
  ): ReadonlyArray<InternshipApplyStatement> {
    return apiResponse.map(statementDto =>
      convertDtoToInternshipApplyStatement(statementDto),
    );
  }

  export function parseCreateInternshipApplyStatementApiRequest(
    baseStatementId: string,
  ): CreateInternshipApplyStatementApiRequest {
    return {
      baseStatementId,
    };
  }
}
