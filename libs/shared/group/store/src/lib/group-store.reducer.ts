import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { GroupStoreState } from './group-store-state.interface';
import { groupActions } from './group-store.actions';
import { GROUP_STORE_FEATURE_KEY } from './group-store.key';

const initalState: GroupStoreState = {
  groups: [],
};

const reducer = createReducer(
  initalState,
  on(groupActions.loadGroups, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),

  on(groupActions.loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups,
    status: StoreStateStatus.Loaded,
  })),
);

export const groupStore = createFeature({
  name: GROUP_STORE_FEATURE_KEY,
  reducer,
});
