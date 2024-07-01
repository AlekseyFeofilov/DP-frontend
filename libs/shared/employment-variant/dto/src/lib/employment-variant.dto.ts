import { CompanyDto } from '@dp/shared/company/dto';

export enum EmploymentVariantDtoStatus {
  NoInfo = 'NoInfo',
  Interviewed = 'Interviewed',
  OfferPending = 'OfferPending',
  OfferAccepted = 'OfferAccepted',
  OfferRefused = 'OfferRefused',
}

export interface EmploymentVariantDto {
  id: string;
  status: EmploymentVariantDtoStatus;
  priority: number;
  employer: CompanyDto;
  occupation: string;
  studentId: string;
  comment?: string | null;
}
