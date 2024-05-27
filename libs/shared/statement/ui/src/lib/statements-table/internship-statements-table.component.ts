import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  booleanAttribute,
} from '@angular/core';
import {
  InternshipCheckStatementStatus,
  InternshipStatementCommon,
} from '@dp/shared/statement/type';
import { TableColumn } from '@dp/shared/types';
import { TableColumnDirective } from '@dp/shared/utils';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiHintModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { COLUMNS } from './columns';

@Component({
  selector: 'dp-internship-statements-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiLetModule,
    TuiTableModule,
    TableColumnDirective,
    TuiMapperPipeModule,
    TuiButtonModule,
    TuiHintModule,
    TuiTooltipModule,
  ],
  templateUrl: './internship-statements-table.component.html',
  styleUrl: './internship-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipStatementsTableComponent {
  @Input({ required: true })
  statements: InternshipStatementCommon[] = [];

  @Input({ transform: booleanAttribute })
  set hideStudentColumn(value: boolean) {
    if (value) {
      this.columns = COLUMNS.filter(column => column.property !== 'student');
      return;
    }

    this.columns = COLUMNS;
  }

  @Input({ transform: booleanAttribute })
  hideNewStatementStatementAction = false;

  @Output() messageClicked = new EventEmitter<void>();
  @Output() newStatementClicked = new EventEmitter<InternshipStatementCommon>();

  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  columns: TableColumn[] = [];

  readonly getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  // TODO
  readonly showCreateInternshipApplyStatementAction = (
    statement: InternshipStatementCommon,
  ): boolean => {
    return (
      !this.hideNewStatementStatementAction &&
      statement.status === InternshipCheckStatementStatus.Accepted
    );
  };

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  onNewStatementClick(baseStatement: InternshipStatementCommon): void {
    this.newStatementClicked.emit(baseStatement);
  }

  getStatusClassName(statement: InternshipStatementCommon): string {
    switch (statement.status) {
      case InternshipCheckStatementStatus.Accepted:
        return 'accepted';
      case InternshipCheckStatementStatus.Declined:
        return 'declined';
      case InternshipCheckStatementStatus.NonVerified:
        return 'non-verified';
      case InternshipCheckStatementStatus.Unactual:
        return 'unactual';
      default:
        return '';
    }
  }
}
