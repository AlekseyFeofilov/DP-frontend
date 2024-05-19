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
  employerId: string; // TODO
  occupation: string;
  studentId: string;
  comment?: string | null;
}
