import { TableColumn } from '@dp/shared/types';

export const COLUMNS: ReadonlyArray<TableColumn> = [
  {
    property: 'name',
    title: 'Название',
    sorter: null,
  },
  {
    property: 'tutor',
    title: 'Куратор',
    sorter: null,
  },
  {
    property: 'contact',
    title: 'Контакт',
    sorter: null,
  },
  {
    property: 'vacancies',
    title: 'Вакансии',
    sorter: null,
  },
  {
    property: 'actions',
    title: null,
    sorter: null,
  },
];
