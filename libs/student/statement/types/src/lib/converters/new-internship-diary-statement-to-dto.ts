import { CreateInternshipDiaryStatementDto } from '@dp/student/statement/dto';
import { NewIntrenshipDiaryStatement } from '../models';

export function convertNewInternshipDiaryStatementToDto(
  newIntrenshipDiaryStatement: NewIntrenshipDiaryStatement,
): CreateInternshipDiaryStatementDto {
  return {
    semester: newIntrenshipDiaryStatement.semester,
  };
}
