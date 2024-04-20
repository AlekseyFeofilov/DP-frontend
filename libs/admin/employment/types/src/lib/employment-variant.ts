export enum EmploymentVariantStatus {
  NoInfo = 'Нет',
  Interviewed = 'Прошел собеседование',
  OfferPending = 'Получил оффер (Думаю)',
  OfferAccepted = 'Получил оффер (Принял)',
  OfferRefused = 'Получил оффер (Отказался)',
}

export interface EmploymentVariant {
  priority: number;
  companyName: string;
  comment?: string;
  vacancy: string;
  status: EmploymentVariantStatus;
}
