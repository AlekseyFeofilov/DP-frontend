import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreStateStatus } from '@dp/shared/types';

import { CompanyStoreState } from './company-store-state.interface';
import { COMPANY_STORE_FEATURE_KEY } from './company-store.key';
import { companyActions } from './company-store.actions';

const initalState: CompanyStoreState = {
  allCompanies: [],
  selectedCompany: null,
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(companyActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(companyActions.loadAllSuccess, (state, { companies }) => ({
    ...state,
    allCompanies: companies,
    status: StoreStateStatus.Loaded,
  })),

  on(companyActions.loadSelected, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(companyActions.loadSelectedSuccess, (state, { company }) => ({
    ...state,
    selectedCompany: company,
    status: StoreStateStatus.Loaded,
  })),

  on(companyActions.remove, (state, { company }) => ({
    ...state,
    allCompanies: state.allCompanies.filter(c => c.id != company.id),
  })),
);

export const companyStore = createFeature({
  name: COMPANY_STORE_FEATURE_KEY,
  reducer,
});
