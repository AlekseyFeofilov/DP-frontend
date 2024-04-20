import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Company } from '@dp/admin/company/types';
import { PATH_NAME } from '@dp/admin/shared/consts';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { TuiTagModule } from '@taiga-ui/kit';
import { columns } from './columns';
import { companiesMock } from './mock';
import { TableColumnDirective } from './teble-column.directive';

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
  ],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesTableComponent {
  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  readonly columns = columns;
  readonly companies = companiesMock;

  getColumnTemplate = (column: any): TemplateRef<any> | null =>
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

  onPage(page: number): void {
    console.log(page);
  }
}
