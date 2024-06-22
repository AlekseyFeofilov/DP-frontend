import { Injectable, inject } from '@angular/core';
import { StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';

import { EmploymentStudentCountFilterType } from '@dp/admin/employment/types';
import { employmentActions } from './employment-store.actions';
import { fromEmploymentStore } from './employment-store.selectors';

@Injectable()
export class EmploymentStoreFacade {
  private readonly store = inject(Store);

  readonly dashboardInfo$ = this.store.pipe(
    select(fromEmploymentStore.selectFilteredDashboardInfo),
  );
  readonly dashboardFilters$ = this.store.pipe(
    select(fromEmploymentStore.selectDashboardFilters),
  );

  readonly status$ = this.store.pipe(select(fromEmploymentStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(employmentActions.loadDashboard());
  }

  setFilter(filterType: EmploymentStudentCountFilterType): void {
    this.store.dispatch(employmentActions.setDashboardFilter({ filterType }));
  }
}
