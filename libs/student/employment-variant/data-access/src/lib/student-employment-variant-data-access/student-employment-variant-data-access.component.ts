import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-student-employment-variant-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-employment-variant-data-access.component.html',
  styleUrl: './student-employment-variant-data-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentEmploymentVariantDataAccessComponent {}
