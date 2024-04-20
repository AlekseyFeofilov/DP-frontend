import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EmploymentsFiltersComponent,
  EmploymentsTableComponent,
} from '@dp/admin/employment/ui';

@Component({
  selector: 'dp-all-employments',
  standalone: true,
  imports: [
    CommonModule,
    EmploymentsTableComponent,
    EmploymentsFiltersComponent,
  ],
  templateUrl: './all-employments.component.html',
  styleUrl: './all-employments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllEmploymentsComponent {}
