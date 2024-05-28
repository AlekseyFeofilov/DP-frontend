import {
  EmploymentStudentCountFilterType,
  EmploymentStudentCountFilters,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { createAction, props } from '@ngrx/store';

import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';

const loadDashboard = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info`,
);

const loadDashboardInfoSuccess = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info success`,
  props<{ readonly dashboardInfo: ReadonlyArray<StudentWithEmployments> }>(),
);

const loadDashboardFiltersSuccess = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard filters success`,
  props<{ readonly dashboardFilters: EmploymentStudentCountFilters }>(),
);

const setDashboardFilter = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] set current dashboard filter`,
  props<{ readonly filterType: EmploymentStudentCountFilterType }>(),
);

export const employmentActions = {
  loadDashboard,
  loadDashboardInfoSuccess,
  loadDashboardFiltersSuccess,
  setDashboardFilter,
};
