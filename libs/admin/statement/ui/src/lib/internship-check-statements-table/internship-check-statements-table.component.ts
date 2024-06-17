import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import { ChatDialogService } from '@dp/shared/chat/ui';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import {
  InternshipCheckStatementStatus,
  InternshipStatementCommon,
  convertInternshipCheckStatementToCommon,
  convertInternshipStatementCommonToCheck,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-internship-check-statements-table',
  standalone: true,
  imports: [CommonModule, InternshipStatementsTableComponent, TuiLoaderModule],
  providers: [TuiDestroyService],
  templateUrl: './internship-check-statements-table.component.html',
  styleUrl: './internship-check-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipCheckStatementsTableComponent implements OnInit {
  private readonly statementStoreFacade = inject(StatementStoreFacade);
  private readonly chatDialogService = inject(ChatDialogService);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly isLoading$ = this.statementStoreFacade.isLoading$;

  readonly statements$ =
    this.statementStoreFacade.internshipCheckStatements$.pipe(
      map(statements =>
        statements.map(statement =>
          convertInternshipCheckStatementToCommon(statement),
        ),
      ),
    );

  ngOnInit(): void {
    this.statementStoreFacade.loadAllInternshipCheck();
  }

  acceptStatement(statement: InternshipStatementCommon): void {
    this.statementStoreFacade.changeInternshipCheckStatus(
      convertInternshipStatementCommonToCheck(statement),
      InternshipCheckStatementStatus.Accepted,
    );
  }

  declineStatement(statement: InternshipStatementCommon): void {
    this.statementStoreFacade.changeInternshipCheckStatus(
      convertInternshipStatementCommonToCheck(statement),
      InternshipCheckStatementStatus.Declined,
    );
  }

  openChat(statement: InternshipStatementCommon): void {
    this.chatDialogService
      .open(ATTACHMENT_ENTITY_TYPE.InternshipCheckStatement.key, statement.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
