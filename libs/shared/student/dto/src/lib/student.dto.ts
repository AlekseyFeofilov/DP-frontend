import { GroupDto } from './group.dto';

export interface StudentDto {
  userId: string;
  name: string;
  group?: GroupDto | null;
}
