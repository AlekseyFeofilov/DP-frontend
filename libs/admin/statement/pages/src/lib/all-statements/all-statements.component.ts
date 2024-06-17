import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  InternshipApplyStatementsTableComponent,
  InternshipCheckStatementsTableComponent,
  StatementFiltersComponent,
} from '@dp/admin/statement/ui';
import { NavigationDataService } from '@dp/shared/core';
import { StatementRouteData } from '@dp/shared/statement/type';
import { TuiLetModule } from '@taiga-ui/cdk';
import { map } from 'rxjs';

@Component({
  selector: 'dp-all-statements',
  standalone: true,
  imports: [
    CommonModule,
    TuiLetModule,
    InternshipCheckStatementsTableComponent,
    InternshipApplyStatementsTableComponent,
    StatementFiltersComponent,
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
}
