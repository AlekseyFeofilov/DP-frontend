import { InternshipStatementCommon } from '@dp/shared/statement/type';
import { TableColumn } from '@dp/shared/types';

export const COLUMNS: Array<TableColumn> = [
  {
    property: 'student',
    title: 'ФИО студента',
    sorter: null,
  },
  {
    property: 'date',
    title: 'Дата',
    sorter: (a: InternshipStatementCommon, b: InternshipStatementCommon) =>
      a.createDate.dayAfter(b.createDate) ? 1 : -1, // TODO: вынести
  },
  {
    property: 'company',
    title: 'Компания',
    sorter: null,
  },
  {
    property: 'vacancy',
    title: 'Вакансия',
    sorter: null,
  },
  {
    property: 'status',
    title: 'Статус',
    sorter: null,
  },
  {
    property: 'actions',
    title: null,
    sorter: null,
  },
];
