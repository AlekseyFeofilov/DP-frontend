import { GroupDto } from '@dp/shared/group/dto';

export interface StudentDto {
  userId: string;
  name: string;
  group?: GroupDto | null;
}
