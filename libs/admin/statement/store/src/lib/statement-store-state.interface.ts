import {
  InternshipApplyStatement,
  InternshipCheckStatement,
} from '@dp/shared/statement/type';
import { Group } from '@dp/shared/student/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface StatemntFilters {
  studentName: string | null;
  groupIds: ReadonlyArray<string>;
  companyName: string | null;
  vacancyName: string | null;
}
export interface StatementStoreState {
  readonly allInternshipCheckStatements: ReadonlyArray<InternshipCheckStatement>;
  readonly allInternshipApplyStatements: ReadonlyArray<InternshipApplyStatement>;
  readonly groups: ReadonlyArray<Group>;
  readonly filters: StatemntFilters;
  readonly status: StoreStateStatus;
}
