import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatementsTableComponent } from '@dp/student/statement/ui';

@Component({
  selector: 'dp-all-statements',
  standalone: true,
  imports: [CommonModule, StatementsTableComponent],
  templateUrl: './all-statements.component.html',
  styleUrl: './all-statements.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllStatementsComponent {}
