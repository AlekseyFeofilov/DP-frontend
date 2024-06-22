import { Group } from '@dp/shared/group/types';

export interface Student {
  id: string;
  name: string;
  group: Group | null;
}
