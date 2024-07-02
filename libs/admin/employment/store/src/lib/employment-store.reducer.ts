import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';

import { EmploymentStudentStatus } from '@dp/admin/employment/types';
import {
  EmploymentFilters,
  EmploymentStoreState,
} from './employment-store-state.interface';
import { employmentActions } from './employment-store.actions';
import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';

const initialFilters: EmploymentFilters = {
  studentName: null,
  groupIds: [],
  companyName: null,
  vacancyName: null,
  statuses: Object.values(EmploymentStudentStatus),
};

const initalState: EmploymentStoreState = {
  dashboardInfo: [],
  filters: initialFilters,
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(employmentActions.loadDashboard, state => ({
    ...state,
    filters: initialFilters,
    status: StoreStateStatus.Loading,
  })),
  on(
    employmentActions.loadDashboardInfoSuccess,
    (state, { dashboardInfo }) => ({
      ...state,
      dashboardInfo,
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(employmentActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  })),
);

export const employmentStore = createFeature({
  name: EMPLOYMENT_STORE_FEATURE_KEY,
  reducer,
});
