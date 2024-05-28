import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationDataService } from '@dp/shared/core';
import { StatementRouteData } from '@dp/shared/statement/type';
import { PATH_NAME } from '@dp/student/shared/consts';
import { STATEMENT_CATEGORIES } from '@dp/student/statement/consts';
import {
  InternshipApplyStatementsTableComponent,
  InternshipCheckStatementsTableComponent,
} from '@dp/student/statement/ui';
import { TuiLetModule, tuiPure } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { map } from 'rxjs';

@Component({
  selector: 'dp-all-statements',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    InternshipCheckStatementsTableComponent,
    InternshipApplyStatementsTableComponent,
    TuiLetModule,
    TuiButtonModule,
  ],
  providers: [NavigationDataService],
  templateUrl: './all-statements.component.html',
  styleUrl: './all-statements.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllStatementsComponent {
  private readonly navigationDataService = inject(NavigationDataService);

  readonly statementType$ = this.navigationDataService
    .getData<StatementRouteData>()
    .pipe(map(data => data.statementType));

  readonly statementName$ = this.statementType$.pipe(
    map(statementType =>
      (statementType === 'internshipCheck'
        ? STATEMENT_CATEGORIES['internshipCheck']
        : STATEMENT_CATEGORIES['internshipApply']
      ).name.toLowerCase(),
    ),
  );

  @tuiPure
  get createRoute(): string[] {
    return [PATH_NAME.create];
  }
}
