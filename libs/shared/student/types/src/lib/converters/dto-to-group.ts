import { GroupDto } from '@dp/shared/student/dto';
import { Group } from '../models/group';
import { GRADE_MAP_FROM_DTO } from './grade-map';

export function convertDtoToGroup(dto: GroupDto): Group {
  return {
    id: dto.id,
    number: dto.number,
    grade: GRADE_MAP_FROM_DTO[dto.grade],
  };
}
