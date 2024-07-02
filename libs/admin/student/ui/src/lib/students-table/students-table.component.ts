import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentStoreFacade } from '@dp/admin/student/store';
import { TableColumn } from '@dp/shared/types';
import { TableColumnDirective } from '@dp/shared/utils';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-students-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule,
    TuiLetModule,
    TuiMapperPipeModule,
    RouterLink,
    TableColumnDirective,
  ],
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsTableComponent {
  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  private readonly studentStoreFacade = inject(StudentStoreFacade);

  readonly students = this.studentStoreFacade.students$;

  readonly columns: TableColumn[] = COLUMNS;

  readonly getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }
}
