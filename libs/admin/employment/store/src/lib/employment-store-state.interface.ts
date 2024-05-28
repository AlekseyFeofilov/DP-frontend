import {
  EmploymentStudentCountFilterType,
  EmploymentStudentCountFilters,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface EmploymentStoreState {
  readonly dashboardInfo: ReadonlyArray<StudentWithEmployments>;
  readonly dashboardFilters: EmploymentStudentCountFilters | null;
  readonly currentFilter: EmploymentStudentCountFilterType;
  readonly status: StoreStateStatus;
}
