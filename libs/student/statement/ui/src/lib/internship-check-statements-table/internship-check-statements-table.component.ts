import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ChatDialogService } from '@dp/shared/chat/ui';
import {
  InternshipStatementCommon,
  convertInternshipCheckStatementToCommon,
  convertInternshipStatementCommonToCheck,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { StatementStoreFacade } from '@dp/student/statement/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-internship-check-statements-table',
  standalone: true,
  imports: [CommonModule, InternshipStatementsTableComponent, TuiLoaderModule],
  templateUrl: './internship-check-statements-table.component.html',
  styleUrl: './internship-check-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
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

  openChat(statement: InternshipStatementCommon): void {
    this.chatDialogService
      .open(statement.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  createInternshipApplyStatement(
    baseStatement: InternshipStatementCommon,
  ): void {
    this.statementStoreFacade.createInternshipApply(
      convertInternshipStatementCommonToCheck(baseStatement),
    );
  }
}
