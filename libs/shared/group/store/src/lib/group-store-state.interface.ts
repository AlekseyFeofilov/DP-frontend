import { Group } from '@dp/shared/group/types';

export interface GroupStoreState {
  readonly groups: ReadonlyArray<Group>;
}
