import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import { ChatDialogService } from '@dp/shared/chat/ui';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import {
  InternshipApplyStatementStatus,
  InternshipStatementCommon,
  convertInternshipApplyStatementToCommon,
  convertInternshipStatementCommonToApply,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { FiltersWithAllComponent } from '@dp/shared/ui';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-internship-apply-statements-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InternshipStatementsTableComponent,
    TuiLoaderModule,
    FiltersWithAllComponent,
  ],
  providers: [TuiDestroyService],
  templateUrl: './internship-apply-statements-table.component.html',
  styleUrl: './internship-apply-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipApplyStatementsTableComponent implements OnInit {
  private readonly statementStoreFacade = inject(StatementStoreFacade);
  private readonly chatDialogService = inject(ChatDialogService);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly isLoading$ = this.statementStoreFacade.isLoading$;

  private readonly filtersControl = new FormControl<
    InternshipApplyStatementStatus[]
  >([], {
    nonNullable: true,
  });

  readonly filtersControl$ = this.statementStoreFacade.filters$.pipe(
    map(({ internshipApplyStatuses: statuses }) => {
      this.filtersControl.setValue([...statuses], { emitEvent: false });
      return this.filtersControl;
    }),
  );

  readonly filtersCapacity$ =
    this.statementStoreFacade.internshipApplyStatusesCapacity$;

  readonly filters = Object.values(InternshipApplyStatementStatus);

  readonly statements$ =
    this.statementStoreFacade.internshipApplyStatements$.pipe(
      map(statements =>
        statements.map(statement =>
          convertInternshipApplyStatementToCommon(statement),
        ),
      ),
    );

  ngOnInit(): void {
    this.statementStoreFacade.loadAllInternshipApply();
  }

  acceptStatement(statement: InternshipStatementCommon): void {
    this.statementStoreFacade.changeInternshipApplyStatus(
      convertInternshipStatementCommonToApply(statement),
      InternshipApplyStatementStatus.Accepted,
    );
  }

  declineStatement(statement: InternshipStatementCommon): void {
    this.statementStoreFacade.changeInternshipApplyStatus(
      convertInternshipStatementCommonToApply(statement),
      InternshipApplyStatementStatus.Declined,
    );
  }

  openChat(statement: InternshipStatementCommon): void {
    this.chatDialogService
      .open(ATTACHMENT_ENTITY_TYPE.InternshipApplyStatement.key, statement.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
