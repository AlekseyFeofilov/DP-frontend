import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-student-employment-variant-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-employment-variant-store.component.html',
  styleUrl: './student-employment-variant-store.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentEmploymentVariantStoreComponent {}
