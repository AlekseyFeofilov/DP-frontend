import { groupStore } from './group-store.reducer';

const { selectGroups } = groupStore;

export const fromGroupStore = {
  selectGroups,
};
