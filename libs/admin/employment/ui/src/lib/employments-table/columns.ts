import { TableColumn } from '@dp/admin/shared/types';
import { tuiDefaultSort } from '@taiga-ui/cdk';

export const COLUMNS: ReadonlyArray<TableColumn> = [
  {
    property: 'student',
    title: 'Студент',
    sorter: (a, b) => tuiDefaultSort(a.name, b.name),
  },
  {
    property: 'status',
    title: 'Статус',
    sorter: null,
  },
  {
    property: 'company',
    title: 'Компания',
    sorter: null,
    colSpan: 2,
  },
  {
    property: 'actions',
    title: null,
    sorter: null,
  },
];
