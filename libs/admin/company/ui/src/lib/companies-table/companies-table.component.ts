import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyStoreFacade } from '@dp/admin/company/store';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { TableColumnDirective } from '@dp/shared/utils';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { TuiTagModule } from '@taiga-ui/kit';

import { Company } from '@dp/shared/company/types';
import { TableColumn } from '@dp/shared/types';
import { TuiTooltipModule } from '@taiga-ui/core';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-companies-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiTableModule,
    TuiTagModule,
    TuiLetModule,
    TuiButtonModule,
    TableColumnDirective,
    TuiMapperPipeModule,
    TuiTablePaginationModule,
    TuiTooltipModule,
  ],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesTableComponent {
  @Output() removeClicked = new EventEmitter<Company>();

  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  private readonly companyStoreFacade = inject(CompanyStoreFacade);

  readonly columns = COLUMNS;
  readonly companies$ = this.companyStoreFacade.companies$;

  getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  getEditCompanyRoute = (company: Company): string[] => [
    company.id,
    PATH_NAME.edit,
  ];

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  remove(company: Company): void {
    this.removeClicked.emit(company);
  }
}
