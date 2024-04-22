import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import {
  EmploymentStatus,
  EmploymentVariantStatus,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { TableColumn } from '@dp/admin/shared/types';
import { TableColumnDirective } from '@dp/admin/shared/utils';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiSvgModule, TuiWrapperModule } from '@taiga-ui/core';
import {
  TuiButtonModule,
  TuiTooltipModule,
  tuiTooltipOptionsProvider,
} from '@taiga-ui/experimental';
import { TUI_ARROW } from '@taiga-ui/kit';
import { COLUMNS } from './columns';
import { employmentsMock } from './mocks';

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
  readonly columns = COLUMNS;
  readonly studentsWithEmployments = employmentsMock;
  readonly arrow = TUI_ARROW;

  open = false;

  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

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

  // вынести
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

  // вынести
  getCommonStatusText(student: StudentWithEmployments): string {
    if (student.employment) {
      if (student.employment.status === EmploymentStatus.Verified) {
        return 'Трудоустроен';
      } else {
        return 'Трудоустроен (не подтверждено)';
      }
    }

    if (student.employmentVariants.length) {
      if (
        student.employmentVariants.find(variant =>
          [
            EmploymentVariantStatus.OfferPending,
            EmploymentVariantStatus.OfferAccepted,
            EmploymentVariantStatus.OfferRefused,
          ].includes(variant.status),
        )
      ) {
        return 'Получил оффер';
      }

      if (
        student.employmentVariants.find(
          variant => variant.status === EmploymentVariantStatus.Interviewed,
        )
      ) {
        return 'Прошел собеседование';
      }

      return 'Выбираю компании';
    }

    return 'Нет';
  }

  getEmploymentStatusColor(status: EmploymentStatus): string {
    return status === EmploymentStatus.Verified
      ? 'var(--tui-success-fill)'
      : 'var(--tui-error-fill)';
  }
}
