import { InternshipDiaryStatement } from '@dp/shared/statement/type';
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
    sorter: (a: InternshipDiaryStatement, b: InternshipDiaryStatement) =>
      a.createDate.dayAfter(b.createDate) ? 1 : -1, // TODO: вынести
  },
  {
    property: 'semester',
    title: 'Семестр',
    sorter: null,
  },
  {
    property: 'status',
    title: 'Статус',
    sorter: null,
  },
  {
    property: 'mark',
    title: 'Оценка',
    sorter: null,
  },
];
