import { StudentWithEmployments } from '@dp/admin/employment/types';
import { createAction, props } from '@ngrx/store';

import { EmploymentFilters } from './employment-store-state.interface';
import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';

const loadDashboard = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info`,
);

const loadDashboardInfoSuccess = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info success`,
  props<{ readonly dashboardInfo: ReadonlyArray<StudentWithEmployments> }>(),
);

const setFilters = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] set filters`,
  props<{
    readonly filters: Partial<EmploymentFilters>;
  }>(),
);

const init = createAction(`[${EMPLOYMENT_STORE_FEATURE_KEY}] init effects`);

export const employmentActions = {
  loadDashboard,
  loadDashboardInfoSuccess,
  setFilters,
  init,
};
