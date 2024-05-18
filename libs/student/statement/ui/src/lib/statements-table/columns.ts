import { TableColumn } from '@dp/shared/types';
import { StatementCommon } from '@dp/student/statement/types';

export const COLUMNS: ReadonlyArray<TableColumn> = [
  {
    property: 'type',
    title: 'Тип заявки',
    sorter: null,
  },
  {
    property: 'date',
    title: 'Дата',
    sorter: (a: StatementCommon, b: StatementCommon) =>
      a.date.dayAfter(b.date) ? 1 : -1, // TODO: вынести
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
