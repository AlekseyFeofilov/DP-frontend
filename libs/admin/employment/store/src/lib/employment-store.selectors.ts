import { isStudentEmploymentStatusMatchFilterType } from '@dp/admin/employment/utils';
import { createSelector } from '@ngrx/store';
import { employmentStore } from './employment-store.reducer';

const {
  selectDashboardInfo,
  selectDashboardFilters,
  selectCurrentFilter,
  selectStatus,
} = employmentStore;

export const selectFilteredDashboardInfo = createSelector(
  selectDashboardInfo,
  selectCurrentFilter,
  (dashboardInfo, filterType) =>
    dashboardInfo.filter(student =>
      isStudentEmploymentStatusMatchFilterType(student.status, filterType),
    ),
);

export const fromEmploymentStore = {
  selectFilteredDashboardInfo,
  selectDashboardFilters,
  selectStatus,
};
