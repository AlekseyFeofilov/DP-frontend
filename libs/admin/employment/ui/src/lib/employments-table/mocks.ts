import {
  EmploymentStudentStatus,
  StudentWithEmployments,
  EmploymentStatus,
} from '@dp/admin/employment/types';
import { EmploymentVariantStatus } from '@dp/shared/employment-variant/types';

export const employmentsMock: ReadonlyArray<StudentWithEmployments> = [
  {
    id: '1',
    name: 'Иванов Иван',
    group: 972101,
    status: EmploymentStudentStatus.Employed,
    employment: {
      id: '1',
      vacancy: 'QA',
      comment: 'На самом деле Тинькофф',
      companyName: 'HITS',
      status: EmploymentStatus.Inactive,
    },
    employmentVariants: [
      {
        priority: 0,
        companyName: 'Ozon',
        vacancy: 'Backend Python',
        status: EmploymentVariantStatus.OfferPending,
      },
      {
        priority: 1,
        companyName: 'ЦФТ',
        vacancy: 'Backend Java',
        status: EmploymentVariantStatus.Interviewed,
      },
      {
        priority: 2,
        companyName: 'Ozon',
        vacancy: 'Backend Java',
        status: EmploymentVariantStatus.NoInfo,
      },
    ],
  },
  {
    id: '2',
    name: 'Петров Иван',
    group: 972101,
    status: EmploymentStudentStatus.Employed,
    employment: {
      id: '1',
      vacancy: 'Front react',
      companyName: 'red_mad_robot',
      status: EmploymentStatus.Active,
      comment: null,
    },
    employmentVariants: [
      {
        priority: 0,
        vacancy: 'Front react',
        companyName: 'red_mad_robot',
        status: EmploymentVariantStatus.OfferAccepted,
      },
      {
        priority: 1,
        vacancy: 'Front',
        companyName: 'НТР',
        status: EmploymentVariantStatus.OfferRefused,
      },
      {
        priority: 2,
        vacancy: 'Front',
        companyName: 'ЦФТ',
        status: EmploymentVariantStatus.OfferPending,
      },
    ],
  },
  {
    id: '3',
    name: 'Иванов Иван',
    group: 972101,
    employment: null,
    status: EmploymentStudentStatus.Non,
    employmentVariants: [
      {
        priority: 0,
        vacancy: 'бэк дотнет',
        companyName: 'НТР',
        status: EmploymentVariantStatus.Interviewed,
      },
      {
        priority: 1,
        vacancy: 'бэк дотнет',
        companyName: 'ЦФТ',
        status: EmploymentVariantStatus.Interviewed,
      },
    ],
  },
];
