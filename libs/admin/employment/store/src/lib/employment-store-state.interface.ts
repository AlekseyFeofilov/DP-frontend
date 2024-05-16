import { StudentWithEmployments } from '@dp/admin/employment/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface EmploymentStoreState {
  readonly dashboardInfo: ReadonlyArray<StudentWithEmployments>;
  readonly status: StoreStateStatus;
}
