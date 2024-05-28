import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import {
  InternshipCheckStatementStatus,
  InternshipStatementCommon,
  convertInternshipCheckStatementToCommon,
  convertInternshipStatementCommonToCheck,
} from '@dp/shared/statement/type';
import { InternshipStatementsTableComponent } from '@dp/shared/statement/ui';
import { TuiLoaderModule } from '@taiga-ui/core';
import { map } from 'rxjs';

@Component({
  selector: 'dp-internship-check-statements-table',
  standalone: true,
  imports: [CommonModule, InternshipStatementsTableComponent, TuiLoaderModule],
  templateUrl: './internship-check-statements-table.component.html',
  styleUrl: './internship-check-statements-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipCheckStatementsTableComponent implements OnInit {
  private readonly statementStoreFacade = inject(StatementStoreFacade);

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
}
