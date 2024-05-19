import { EmploymentVariantDtoStatus } from '@dp/shared/employment-variant/dto';

export interface CreateEmploymentVariantDto {
  employerId: string;
  occupation: string;
  status: EmploymentVariantDtoStatus;
  priority: number;
  comment?: string | null;
}
