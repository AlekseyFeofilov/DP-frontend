import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import { EmploymentStatus } from '@dp/admin/employment/types';
import { TableColumnDirective } from '@dp/shared/utils';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiSvgModule, TuiWrapperModule } from '@taiga-ui/core';
import { TuiButtonModule, TuiTooltipModule } from '@taiga-ui/experimental';
import { TUI_ARROW } from '@taiga-ui/kit';

import { isStudentEmploymentStatusMatchFilterType } from '@dp/admin/employment/utils';
import { TableColumn } from '@dp/shared/types';
import { map, switchMap } from 'rxjs';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-employments-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule,
    TuiTablePaginationModule,
    TuiLetModule,
    TuiSvgModule,
    TuiWrapperModule,
    TableColumnDirective,
    TuiMapperPipeModule,
    TuiButtonModule,
    TuiTooltipModule,
  ],
  templateUrl: './employments-table.component.html',
  styleUrl: './employments-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentsTableComponent {
  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  private readonly employmentStoreFacade = inject(EmploymentStoreFacade);

  readonly columns = COLUMNS;
  readonly arrow = TUI_ARROW;
  readonly openRowIds = new Set<number>();

  readonly dashboardFilter$ =
    this.employmentStoreFacade.dashboardCurrentFilter$;
  readonly dashboardInfo$ = this.dashboardFilter$.pipe(
    switchMap(filterType =>
      this.employmentStoreFacade.dashboardInfo$.pipe(
        map(info =>
          info.filter(student =>
            isStudentEmploymentStatusMatchFilterType(
              student.status,
              filterType,
            ),
          ),
        ),
      ),
    ),
  );

  getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  isRowOpen = (rowId: number) => this.openRowIds.has(rowId);

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  onPage(page: number): void {
    console.log(page);
  }

  onRowClick(rowId: number) {
    if (this.isRowOpen(rowId)) {
      this.openRowIds.delete(rowId);
    } else {
      this.openRowIds.add(rowId);
    }
  }

  // TODO: вынести
  getPriorityText(priority: number): string {
    switch (priority) {
      case 0:
        return 'Высокий';
      case 1:
        return 'Средний';
      default:
        return 'Низкий';
    }
  }

  // TODO: возвращать класс
  getEmploymentStatusColor(status: EmploymentStatus): string {
    return status === EmploymentStatus.Active
      ? 'var(--tui-success-fill)'
      : 'var(--tui-error-fill)';
  }
}
