import { Injectable, inject } from '@angular/core';
import { StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';

import { EmploymentFilters } from './employment-store-state.interface';
import { employmentActions } from './employment-store.actions';
import { fromEmploymentStore } from './employment-store.selectors';

@Injectable()
export class EmploymentStoreFacade {
  private readonly store = inject(Store);

  readonly dashboardInfo$ = this.store.pipe(
    select(fromEmploymentStore.selectFilteredDashboardInfo),
  );

  readonly filters$ = this.store.pipe(
    select(fromEmploymentStore.selectFilters),
  );

  readonly statusesCapacity$ = this.store.pipe(
    select(fromEmploymentStore.selectDashboardStatusesCapacity),
  );

  readonly status$ = this.store.pipe(select(fromEmploymentStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(employmentActions.loadDashboard());
  }

  setFilters(filters: Partial<EmploymentFilters>): void {
    this.store.dispatch(employmentActions.setFilters({ filters }));
  }
}
