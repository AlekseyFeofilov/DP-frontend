import { FileInfo } from '@dp/shared/file/types';
import { Student } from '@dp/shared/student/types';
import { TuiDay } from '@taiga-ui/cdk';
import { InternshipDiaryStatementStatus } from '../enums/internship-diary-statement-status';

export interface InternshipDiaryStatement {
  id: string;
  student: Student;
  files: FileInfo[];
  semester: number;
  status: InternshipDiaryStatementStatus;
  createDate: TuiDay;
  modifyDate: TuiDay;
  mark: number | null;
}
