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
import { DiaryStoreFacade } from '@dp/admin/diary/store';
import {
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
} from '@dp/shared/statement/type';
import { TableColumn } from '@dp/shared/types';
import { TableColumnDirective } from '@dp/shared/utils';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiHintModule } from '@taiga-ui/core';
import { TuiButtonModule, TuiTooltipModule } from '@taiga-ui/experimental';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-internship-diary-statements-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiLetModule,
    TuiTableModule,
    TableColumnDirective,
    TuiMapperPipeModule,
    TuiButtonModule,
    TuiHintModule,
    TuiTooltipModule,
  ],
  templateUrl: './internship-diary-statements-table.component.html',
  styleUrl: './internship-diary-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatementsTableComponent {
  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  private readonly diaryStoreFacade = inject(DiaryStoreFacade);

  readonly statements$ = this.diaryStoreFacade.internshipDiaryStatements$;

  readonly columns: TableColumn[] = COLUMNS;

  readonly getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  getStatusClassName(statement: InternshipDiaryStatement): string {
    switch (statement.status) {
      case InternshipDiaryStatementStatus.Rated:
      case InternshipDiaryStatementStatus.Approved:
      case InternshipDiaryStatementStatus.SubmittedForSigning:
        return 'accepted';
      case InternshipDiaryStatementStatus.OnRevision:
        return 'declined';
      case InternshipDiaryStatementStatus.OnVerification:
        return 'non-verified';
      default:
        return '';
    }
  }
}
