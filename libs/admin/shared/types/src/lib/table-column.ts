import { TuiComparator } from '@taiga-ui/addon-table/types';

export interface TableColumn {
  property: string;
  title: string | null;
  sorter: TuiComparator<any> | null;
}
