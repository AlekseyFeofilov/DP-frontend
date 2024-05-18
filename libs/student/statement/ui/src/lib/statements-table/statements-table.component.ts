import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { TableColumnDirective } from '@dp/shared/utils';
import { statementsMock } from '@dp/student/statement/store';
import {
  StatementCommon,
  StatementStatus,
  StatementType,
} from '@dp/student/statement/types';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiHintModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { of } from 'rxjs';

import { TableColumn } from '@dp/shared/types';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-statements-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiLetModule,
    TuiTableModule,
    TableColumnDirective,
    TuiMapperPipeModule,
    TuiButtonModule,
    TuiHintModule,
  ],
  templateUrl: './statements-table.component.html',
  styleUrl: './statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementsTableComponent {
  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  // private readonly companyStoreFacade = inject(CompanyStoreFacade);

  readonly columns = COLUMNS;
  readonly statements$ = of(statementsMock);

  getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  getStatusClassName(statement: StatementCommon): string {
    switch (statement.status) {
      case StatementStatus.Accepted:
        return 'accepted';
      case StatementStatus.Declined:
        return 'declined';
      case StatementStatus.NonVerified:
        return 'non-verified';
      default:
        return '';
    }
  }

  canCreateEmploymentStatement(statement: StatementCommon): boolean {
    // TODO: добавить условие, что по заявке уже создана другая (если в коллекции есть другая заявка)
    return (
      statement.type === StatementType.Internship &&
      statement.status === StatementStatus.Accepted
    );
  }
}
