import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';
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
  get myStatementsPath(): string[] {
    return ['', PATH_NAME.statement];
  }

  get createStatementPath(): string[] {
    return ['', PATH_NAME.statement, PATH_NAME.create];
  }
}
