import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';
import { StudentDto } from '@dp/shared/student/dto';
import { EmploymentDto } from './employment-dto';

export enum EmploymentStudentDtoStatus {
  Non,
  CompaniesChose,
  PassedTheInterview,
  GetAnOffer,
  EmployedNotVerified,
  Employed,
}

export interface StudentWithEmploymnetsDto extends StudentDto {
  status: EmploymentStudentDtoStatus;
  employmentVariants: EmploymentVariantDto[];
  employments: EmploymentDto[];
}
