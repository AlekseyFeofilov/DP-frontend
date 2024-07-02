import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';
import { StudentDto } from '@dp/shared/student/dto';
import { EmploymentDto } from './employment-dto';

export enum EmploymentStudentDtoStatus {
  None = 'None',
  CompaniesChose = 'CompaniesChose',
  PassedTheInterview = 'PassedTheInterview',
  GetAnOffer = 'GetAnOffer',
  EmployedNotVerified = 'EmployedNotVerified',
  Employed = 'Employed',
}

export interface StudentWithEmploymnetsDto extends StudentDto {
  status: EmploymentStudentDtoStatus;
  employmentVariants: EmploymentVariantDto[];
  employments: EmploymentDto[];
}
