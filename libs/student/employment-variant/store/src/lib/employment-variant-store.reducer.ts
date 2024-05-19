import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';

import { EmploymentVariantStoreState } from './employment-variant-store-state.interface';
import { employmentVariantActions } from './employment-variant-store.actions';
import { EMPLOYMENT_VARIANT_STORE_FEATURE_KEY } from './employment-variant-store.key';

const initalState: EmploymentVariantStoreState = {
  allEmploymentVariants: [],
  selectedEmploymentVariant: null,
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(employmentVariantActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(
    employmentVariantActions.loadAllSuccess,
    (state, { employmentVariants }) => ({
      ...state,
      allEmploymentVariants: employmentVariants,
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(employmentVariantActions.loadSelected, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(
    employmentVariantActions.loadSelectedSuccess,
    (state, { employmentVariant }) => ({
      ...state,
      selectedEmploymentVariant: employmentVariant,
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(employmentVariantActions.remove, (state, { employmentVariant }) => ({
    ...state,
    allEmploymentVariants: state.allEmploymentVariants.filter(
      c => c.id != employmentVariant.id,
    ),
  })),
);

export const employmentVariantStore = createFeature({
  name: EMPLOYMENT_VARIANT_STORE_FEATURE_KEY,
  reducer,
});
