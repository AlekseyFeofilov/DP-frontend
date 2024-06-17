import { FileInfoDto } from '@dp/shared/file/dto';
import { StudentDto } from '@dp/shared/student/dto';

export enum InternshipDiaryStatementDtoStatus {
  No = 'No',
  OnVerification = 'OnVerification',
  OnRevision = 'OnRevision',
  Approved = 'Approved',
  SubmittedForSigning = 'SubmittedForSigning',
  Ready = 'Ready',
}

export interface InternshipDiaryStatementDto {
  id: string;
  student: StudentDto;
  files: FileInfoDto[];
  semester: number;
  status: InternshipDiaryStatementDtoStatus;
  createDateTime: string;
  modifyDateTime: string;
  grade?: number | null;
}
