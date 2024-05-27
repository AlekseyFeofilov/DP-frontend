import { StatementType } from '@dp/shared/statement/type';
import { PATH_NAME } from '@dp/student/shared/consts';

export interface StatementCategory {
  name: string;
  description: string;
  path: string;
}

export const STATEMENT_CATEGORIES: Record<StatementType, StatementCategory> = {
  internshipCheck: {
    name: 'Прохождение практики в компании',
    description:
      'На основе этой заявки после ее одобрения создается заявка на трудоустройств',
    path: PATH_NAME.internshipCheck,
  },
  internshipApply: {
    name: 'Трудоустройство',
    description:
      'На основе этой заявки после ее одобрения создается активное трудоустройство',
    path: PATH_NAME.internshipApply,
  },
  internshipDiary: {
    name: 'Дневник практики',
    description: '',
    path: PATH_NAME.internshipDiary,
  },
};
