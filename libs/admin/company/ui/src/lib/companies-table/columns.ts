import { TableColumn } from '@dp/admin/shared/types';

export const COLUMNS: ReadonlyArray<TableColumn> = [
  {
    property: 'name',
    title: 'Название',
    sorter: null,
  },
  {
    property: 'spokesman',
    title: 'Представитель',
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
    property: 'vacanciesNumber',
    title: 'Кол-во мест',
    sorter: null,
  },
  {
    property: 'actions',
    title: null,
    sorter: null,
  },
];
