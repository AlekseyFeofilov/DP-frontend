import { CreateInternshipStatementApiRequest } from '@dp/student/statement/data-access';
import {
  NewIntrenshipStatement,
  convertNewInternshipStatementToDto,
} from '@dp/student/statement/types';

export namespace StatementApiAdapterHelper {
  export function parseCreateInternshipStatementApiRequest(
    newInternshipStatement: NewIntrenshipStatement,
  ): CreateInternshipStatementApiRequest {
    return {
      payload: convertNewInternshipStatementToDto(newInternshipStatement),
    };
  }
}
