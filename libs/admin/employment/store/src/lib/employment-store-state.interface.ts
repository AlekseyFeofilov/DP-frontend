import {
  EmploymentStudentStatus,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface EmploymentFilters {
  readonly studentName: string | null;
  readonly groupIds: ReadonlyArray<string>;
  readonly companyName: string | null;
  readonly vacancyName: string | null;
  readonly statuses: ReadonlyArray<EmploymentStudentStatus>;
}

export interface EmploymentStoreState {
  readonly dashboardInfo: ReadonlyArray<StudentWithEmployments>;
  readonly filters: EmploymentFilters;
  readonly status: StoreStateStatus;
}
