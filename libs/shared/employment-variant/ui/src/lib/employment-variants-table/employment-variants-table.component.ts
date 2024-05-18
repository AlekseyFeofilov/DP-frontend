import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLOYMENT_VARIANT_PRIORITY } from '@dp/shared/employment-variant/consts';
import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { TableColumn } from '@dp/shared/types';
import { TableColumnDirective } from '@dp/shared/utils';
import { PATH_NAME } from '@dp/student/shared/consts';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiHintModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { COLUMNS } from './columns';
import { employmentVariantsMock } from './employment-variants.mock';

@Component({
  selector: 'dp-employment-variants-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiTableModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TableColumnDirective,
    TuiButtonModule,
    TuiHintModule,
  ],
  templateUrl: './employment-variants-table.component.html',
  styleUrl: './employment-variants-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentVariantsTableComponent {
  // TODO: required
  @Input({ required: false })
  employmentVariants: ReadonlyArray<EmploymentVariant> = employmentVariantsMock;

  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  readonly columns = COLUMNS;
  readonly priorities = EMPLOYMENT_VARIANT_PRIORITY;

  getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  getEditEmploymentVariantRoute = (
    employmentVariant: EmploymentVariant,
  ): string[] => [employmentVariant.id, PATH_NAME.edit];

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }
}
