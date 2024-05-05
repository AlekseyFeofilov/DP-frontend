import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InternshipStatementFormComponent } from '@dp/student/statement/ui';

@Component({
  selector: 'dp-new-internship-statement',
  standalone: true,
  imports: [CommonModule, InternshipStatementFormComponent],
  templateUrl: './new-internship-statement.component.html',
  styleUrl: './new-internship-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewInternshipStatementComponent {}
