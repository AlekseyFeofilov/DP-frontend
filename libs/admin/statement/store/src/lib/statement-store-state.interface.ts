import {
  InternshipApplyStatement,
  InternshipApplyStatementStatus,
  InternshipCheckStatement,
  InternshipCheckStatementStatus,
} from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';

export interface StatemntFilters {
  readonly studentName: string | null;
  readonly groupIds: ReadonlyArray<string>;
  readonly companyName: string | null;
  readonly vacancyName: string | null;
  readonly internshipCheckStatuses: ReadonlyArray<InternshipCheckStatementStatus>;
  readonly internshipApplyStatuses: ReadonlyArray<InternshipApplyStatementStatus>;
}

export interface StatementStoreState {
  readonly allInternshipCheckStatements: ReadonlyArray<InternshipCheckStatement>;
  readonly allInternshipApplyStatements: ReadonlyArray<InternshipApplyStatement>;
  readonly filters: StatemntFilters;
  readonly status: StoreStateStatus;
}
