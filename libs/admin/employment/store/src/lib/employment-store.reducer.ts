import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';

import { EmploymentStoreState } from './employment-store-state.interface';
import { employmentActions } from './employment-store.actions';
import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';

const initalState: EmploymentStoreState = {
  dashboardInfo: [],
  dashboardFilters: null,
  currentFilter: 'all',
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(employmentActions.loadDashboard, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(
    employmentActions.loadDashboardInfoSuccess,
    (state, { dashboardInfo }) => ({
      ...state,
      dashboardInfo,
    }),
  ),
  on(
    employmentActions.loadDashboardFiltersSuccess,
    (state, { dashboardFilters }) => ({
      ...state,
      dashboardFilters,
    }),
  ),
  on(employmentActions.setDashboardFilter, (state, { filterType }) => ({
    ...state,
    currentFilter: filterType,
  })),
);

export const employmentStore = createFeature({
  name: EMPLOYMENT_STORE_FEATURE_KEY,
  reducer,
});
