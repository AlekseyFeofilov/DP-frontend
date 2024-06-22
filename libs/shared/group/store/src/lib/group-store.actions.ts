import { Group } from '@dp/shared/group/types';
import { createAction, props } from '@ngrx/store';
import { GROUP_STORE_FEATURE_KEY } from './group-store.key';

const loadGroups = createAction(
  `[${GROUP_STORE_FEATURE_KEY}] load all study groups`,
);

const loadGroupsSuccess = createAction(
  `[${GROUP_STORE_FEATURE_KEY}] load all study groups success`,
  props<{
    readonly groups: ReadonlyArray<Group>;
  }>(),
);

export const groupActions = {
  loadGroups,
  loadGroupsSuccess,
};
