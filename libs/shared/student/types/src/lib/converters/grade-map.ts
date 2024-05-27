import { GradeDto } from '@dp/shared/student/dto';
import { getEnumMap } from '@dp/shared/utils';
import { Grade } from '../enums/grade';

export const GRADE_MAP_FROM_DTO = getEnumMap(GradeDto, Grade);
