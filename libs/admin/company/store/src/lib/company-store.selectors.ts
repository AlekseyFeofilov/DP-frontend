import { companyStore } from './company-store.reducer';

const { selectAllCompanies, selectSelectedCompany, selectStatus } =
  companyStore;

export const fromCompanyStore = {
  selectAllCompanies,
  selectSelectedCompany,
  selectStatus,
};
