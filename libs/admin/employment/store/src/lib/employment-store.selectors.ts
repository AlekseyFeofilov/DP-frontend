import { employmentStore } from './employment-store.reducer';

const {
  selectDashboardInfo,
  selectDashboardFilters,
  selectCurrentFilter,
  selectStatus,
} = employmentStore;

export const fromEmploymentStore = {
  selectDashboardInfo,
  selectDashboardFilters,
  selectStatus,
  selectCurrentFilter,
};
