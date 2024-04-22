import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmploymentVariantFormComponent } from '@dp/student/employment-variant/ui';

@Component({
  selector: 'dp-new-employment-variant',
  standalone: true,
  imports: [CommonModule, EmploymentVariantFormComponent],
  templateUrl: './new-employment-variant.component.html',
  styleUrl: './new-employment-variant.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEmploymentVariantComponent {}
