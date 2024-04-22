import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmploymentVariantFormComponent } from '@dp/student/employment-variant/ui';

@Component({
  selector: 'dp-edit-employment-variant',
  standalone: true,
  imports: [CommonModule, EmploymentVariantFormComponent],
  templateUrl: './edit-employment-variant.component.html',
  styleUrl: './edit-employment-variant.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmploymentVariantComponent {}
