import { StudentDto } from '@dp/shared/student/dto';
import { Student } from '../models/student';
import { convertDtoToGroup } from './dto-to-group';

export function convertDtoToStudent(dto: StudentDto): Student {
  return {
    id: dto.userId,
    name: dto.name,
    group: dto.group ? convertDtoToGroup(dto.group) : null,
  };
}
