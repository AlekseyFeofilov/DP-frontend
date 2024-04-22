import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmploymentRequestFormComponent } from '@dp/student/employment/ui';

@Component({
  selector: 'dp-new-employment-request',
  standalone: true,
  imports: [CommonModule, EmploymentRequestFormComponent],
  templateUrl: './new-employment-request.component.html',
  styleUrl: './new-employment-request.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEmploymentRequestComponent {}
