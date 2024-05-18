import { CompanyDto } from '@dp/shared/company/dto';

export enum EmploymentVariantDtoStatus {
  NoInfo,
  Interviewed,
  OfferPending,
  OfferAccepted,
  OfferRefused,
}

export interface EmploymentVariantDto {
  id: string;
  status: EmploymentVariantDtoStatus;
  priority: number;
  company: CompanyDto;
  occupation: string;
  studentId: string;
  comment?: string;
}
