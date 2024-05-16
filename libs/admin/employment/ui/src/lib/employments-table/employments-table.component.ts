import {
  ChangeDetectionStrategy,
  ViewChildren,
  TemplateRef,
  Component,
  QueryList,
  inject,
} from '@angular/core';
import {
  tuiTooltipOptionsProvider,
  TuiTooltipModule,
  TuiButtonModule,
} from '@taiga-ui/experimental';
import {
  TuiTablePaginationModule,
  TuiTableModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import { TuiSvgModule, TuiWrapperModule } from '@taiga-ui/core';
import { EmploymentStatus } from '@dp/admin/employment/types';
import { TableColumnDirective } from '@dp/shared/utils';
import { TableColumn } from '@dp/admin/shared/types';
import { CommonModule } from '@angular/common';
import { TUI_ARROW } from '@taiga-ui/kit';

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
  providers: [
    tuiTooltipOptionsProvider({
      icons: 'tuiIconMessageCircle',
    }),
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
  readonly dashboardInfo$ = this.employmentStoreFacade.dashboardInfo$;
  readonly arrow = TUI_ARROW;

  open = false;

  getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  onPage(page: number): void {
    console.log(page);
  }

  onRowClick() {
    this.open = !this.open;
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
