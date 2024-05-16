import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreStateStatus } from '@dp/shared/types';

import { EmploymentStoreState } from './employment-store-state.interface';
import { EMPLOYMENT_STORE_FEATURE_KEY } from './employment-store.key';
import { employmentActions } from './employment-store.actions';

const initalState: EmploymentStoreState = {
  dashboardInfo: [],
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(employmentActions.loadDashboard, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(employmentActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboardInfo: dashboard,
    status: StoreStateStatus.Loaded,
  })),
);

export const employmentStore = createFeature({
  name: EMPLOYMENT_STORE_FEATURE_KEY,
  reducer,
});
