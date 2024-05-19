import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface EmploymentVariantStoreState {
  readonly allEmploymentVariants: ReadonlyArray<EmploymentVariant>;
  readonly selectedEmploymentVariant: EmploymentVariant | null;
  readonly status: StoreStateStatus;
}
