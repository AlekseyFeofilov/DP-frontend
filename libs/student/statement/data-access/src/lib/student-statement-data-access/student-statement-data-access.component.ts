import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-student-statement-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-statement-data-access.component.html',
  styleUrl: './student-statement-data-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentStatementDataAccessComponent {}
