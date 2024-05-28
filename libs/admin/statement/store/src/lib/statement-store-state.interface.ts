import {
  InternshipApplyStatement,
  InternshipCheckStatement,
} from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
export interface StatementStoreState {
  readonly allInternshipCheckStatements: ReadonlyArray<InternshipCheckStatement>;
  readonly allInternshipApplyStatements: ReadonlyArray<InternshipApplyStatement>;
  readonly status: StoreStateStatus;
}
