import { EmploymentDto } from './employment-dto';

export enum EmploymentStudentDtoStatus {
  Non,
  CompaniesChose,
  PassedTheInterview,
  GetAnOffer,
  EmployedNotVerified,
  Employed,
}

export interface StudentWithEmploymnetsDto {
  userId: string;
  name: string;
  status: EmploymentStudentDtoStatus;
  group: {
    id: string;
    number: number;
    grade: number;
  } | null;
  employmentVariants: any[]; // TODO
  employments: EmploymentDto[];
}
