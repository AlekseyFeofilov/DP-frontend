import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import { ChatDialogService } from '@dp/shared/chat/ui';
import {
  InternshipApplyStatementStatus,
  InternshipStatementCommon,
  convertInternshipApplyStatementToCommon,
  convertInternshipStatementCommonToApply,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-internship-apply-statements-table',
  standalone: true,
  imports: [CommonModule, InternshipStatementsTableComponent, TuiLoaderModule],
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
      .open(statement.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
