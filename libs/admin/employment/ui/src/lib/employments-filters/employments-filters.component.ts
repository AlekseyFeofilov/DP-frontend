import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import { EmploymentStudentCountFilterType } from '@dp/admin/employment/types';
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
export class EmploymentsFiltersComponent {
  private readonly employmentStoreFacade = inject(EmploymentStoreFacade);

  readonly filters$ = this.employmentStoreFacade.dashboardFilters$;

  changeFilter(filter: EmploymentStudentCountFilterType): void {
    this.employmentStoreFacade.setFilter(filter);
  }
}
