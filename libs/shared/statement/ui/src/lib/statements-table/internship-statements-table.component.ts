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
    }
  }

  @Input({ transform: booleanAttribute })
  hideNewStatementAction = false;

  @Input({ transform: booleanAttribute })
  hideChangeStatusAction = false;

  @Output() messageClicked = new EventEmitter<InternshipStatementCommon>();
  @Output() newStatementClicked = new EventEmitter<InternshipStatementCommon>();
  @Output() acceptClicked = new EventEmitter<InternshipStatementCommon>();
  @Output() declineClicked = new EventEmitter<InternshipStatementCommon>();

  @ViewChildren(TableColumnDirective)
  columnTemplates?: QueryList<TableColumnDirective>;

  columns: TableColumn[] = COLUMNS;

  readonly getColumnTemplate = (column: TableColumn): TemplateRef<any> | null =>
    this.columnTemplates?.find(
      template => template.columnName === column.property,
    )?.templateRef || null;

  // TODO
  readonly showChangeStatusAction = (
    statement: InternshipStatementCommon,
  ): boolean => {
    return (
      !this.hideChangeStatusAction &&
      statement.status === InternshipCheckStatementStatus.NonVerified
    );
  };

  readonly showCreateInternshipApplyStatementAction = (
    statement: InternshipStatementCommon,
  ): boolean => {
    return (
      !this.hideNewStatementAction &&
      statement.status === InternshipCheckStatementStatus.Accepted
    );
  };

  @tuiPure
  get columnProperties(): string[] {
    return this.columns.map(column => column.property);
  }

  onMessageClick(statement: InternshipStatementCommon): void {
    this.messageClicked.emit(statement);
  }

  onNewStatementClick(statement: InternshipStatementCommon): void {
    this.newStatementClicked.emit(statement);
  }

  onAcceptClick(statement: InternshipStatementCommon): void {
    this.acceptClicked.emit(statement);
  }

  onDeclineClick(statement: InternshipStatementCommon): void {
    this.declineClicked.emit(statement);
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
