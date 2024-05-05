import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-student-statement-dto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-statement-dto.component.html',
  styleUrl: './student-statement-dto.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentStatementDtoComponent {}
