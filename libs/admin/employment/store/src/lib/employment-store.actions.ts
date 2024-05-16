import { StudentWithEmployments } from '@dp/admin/employment/types';
import { createAction, props } from '@ngrx/store';

import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';

const loadDashboard = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info`,
);

const loadDashboardSuccess = createAction(
  `[${EMPLOYMENT_STORE_FEATURE_KEY}] load dashboard info success`,
  props<{ readonly dashboard: ReadonlyArray<StudentWithEmployments> }>(),
);

export const employmentActions = { loadDashboard, loadDashboardSuccess };
