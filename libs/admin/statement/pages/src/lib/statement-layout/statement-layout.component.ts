import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'dp-statement-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TuiTabsModule],
  templateUrl: './statement-layout.component.html',
  styleUrl: './statement-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementLayoutComponent {
  get internshipCheckStatementsPath(): string[] {
    return ['', PATH_NAME.statement, PATH_NAME.internshipCheck];
  }

  get internshipApplyStatementsPath(): string[] {
    return ['', PATH_NAME.statement, PATH_NAME.internshipApply];
  }
}
