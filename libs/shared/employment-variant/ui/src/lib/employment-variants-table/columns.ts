import { TableColumn } from '@dp/shared/types';

export const COLUMNS: ReadonlyArray<TableColumn> = [
  {
    property: 'companyName',
    title: 'Компания',
    sorter: null,
  },
  {
    property: 'vacancy',
    title: 'Вакансия',
    sorter: null,
  },
  {
    property: 'priority',
    title: 'Приоритет',
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
