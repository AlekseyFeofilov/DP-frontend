import { EmploymentStudentStatus } from '@dp/admin/employment/types';
import { getStatusCapacity, isStringIncluded } from '@dp/shared/utils';
import { createSelector } from '@ngrx/store';
import { employmentStore } from './employment-store.reducer';

const { selectDashboardInfo, selectFilters, selectStatus } = employmentStore;

export const selectFilteredDashboardInfo = createSelector(
  selectDashboardInfo,
  selectFilters,
  (dashboardInfo, filters) =>
    dashboardInfo.filter(student => {
      const { studentName, companyName, vacancyName, groupIds, statuses } =
        filters;
      const isMatch =
        (studentName ? isStringIncluded(student.name, studentName) : true) &&
        (companyName
          ? isStringIncluded(student.employment?.companyName ?? '', companyName)
          : true) &&
        (vacancyName
          ? isStringIncluded(student.employment?.vacancy ?? '', vacancyName)
          : true) &&
        (student.group ? groupIds.includes(student.group.id) : false) &&
        statuses.includes(student.status);
      return isMatch;
    }),
);

export const selectDashboardStatusesCapacity = createSelector(
  selectDashboardInfo,
  dashboardInfo =>
    getStatusCapacity(
      [...Object.values(EmploymentStudentStatus)],
      [...dashboardInfo],
    ),
);

export const fromEmploymentStore = {
  selectFilteredDashboardInfo,
  selectFilters,
  selectStatus,
  selectDashboardStatusesCapacity,
};
