import { GroupStore } from './group-store.reducer';

const { selectGroups } = GroupStore;

export const fromGroupStore = {
  selectGroups,
};
