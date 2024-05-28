import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import {
  InternshipApplyStatementStatus,
  InternshipStatementCommon,
  convertInternshipApplyStatementToCommon,
  convertInternshipStatementCommonToApply,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map } from 'rxjs';

@Component({
  selector: 'dp-internship-apply-statements-table',
  standalone: true,
  imports: [CommonModule, InternshipStatementsTableComponent, TuiLoaderModule],
  templateUrl: './internship-apply-statements-table.component.html',
  styleUrl: './internship-apply-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipApplyStatementsTableComponent implements OnInit {
  private readonly statementStoreFacade = inject(StatementStoreFacade);

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
}
