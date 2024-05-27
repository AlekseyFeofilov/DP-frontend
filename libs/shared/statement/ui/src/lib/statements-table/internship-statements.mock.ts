import { Company } from '@dp/shared/company/types';
import {
  InternshipCheckStatementStatus,
  InternshipStatementCommon,
} from '@dp/shared/statement/type';
import { Student } from '@dp/shared/student/types';
import { TuiDay } from '@taiga-ui/cdk';

export const internshipStatementsMock: Array<InternshipStatementCommon> = [
  {
    id: '1',
    student: { name: 'ФИО' } as Student,
    createDate: TuiDay.currentLocal(),
    company: { name: 'Компания' } as Company,
    vacancy: 'Вакансия',
    status: InternshipCheckStatementStatus.Accepted,
  },
  {
    id: '2',
    student: { name: 'ФИО' } as Student,
    createDate: TuiDay.currentLocal(),
    company: { name: 'Компания' } as Company,
    vacancy: 'Вакансия',
    status: InternshipCheckStatementStatus.NonVerified,
  },
];
