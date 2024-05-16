import { employmentStore } from './employment-store.reducer';

const { selectDashboardInfo, selectStatus } = employmentStore;

export const fromEmploymentStore = {
  selectDashboardInfo,
  selectStatus,
};
