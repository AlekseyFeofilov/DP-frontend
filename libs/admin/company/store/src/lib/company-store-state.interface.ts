import { StoreStateStatus } from '@dp/shared/types';
import { Company } from '@dp/admin/company/types';

export interface CompanyStoreState {
  readonly allCompanies: ReadonlyArray<Company>;
  readonly selectedCompany: Company | null;
  readonly status: StoreStateStatus;
}
