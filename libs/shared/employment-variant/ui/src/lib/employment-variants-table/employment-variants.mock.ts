import {
  EmploymentVariant,
  EmploymentVariantStatus,
} from '@dp/shared/employment-variant/types';

export const employmentVariantsMock: ReadonlyArray<EmploymentVariant> = [
  {
    id: '1',
    priority: 0,
    companyName: 'rmr',
    comment: null,
    vacancy: 'front',
    status: EmploymentVariantStatus.Interviewed,
  },
  {
    id: '2',
    priority: 2,
    companyName: 'hits',
    comment: 'Тинькофф',
    vacancy: 'front',
    status: EmploymentVariantStatus.NoInfo,
  },
  {
    id: '3',
    priority: 1,
    companyName: 'нтр',
    comment: null,
    vacancy: 'front',
    status: EmploymentVariantStatus.Interviewed,
  },
];
