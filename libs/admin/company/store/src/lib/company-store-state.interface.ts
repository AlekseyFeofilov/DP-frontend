import { Company } from '@dp/shared/company/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface CompanyStoreState {
  readonly allCompanies: ReadonlyArray<Company>;
  readonly selectedCompany: Company | null;
  readonly status: StoreStateStatus;
}
