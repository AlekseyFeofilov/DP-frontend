import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiBadgeModule } from '@taiga-ui/experimental';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'dp-employments-filters',
  standalone: true,
  imports: [CommonModule, TuiTabsModule, TuiBadgeModule],
  templateUrl: './employments-filters.component.html',
  styleUrl: './employments-filters.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentsFiltersComponent {}
