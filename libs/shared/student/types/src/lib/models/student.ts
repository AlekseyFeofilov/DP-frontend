import { Group } from './group';

export interface Student {
  id: string;
  name: string;
  group: Group | null;
}
