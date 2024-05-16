import { StoreStateStatus } from '@dp/shared/types';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';

import { fromEmploymentStore } from './employment-store.selectors';
import { employmentActions } from './employment-store.actions';

@Injectable()
export class EmploymentStoreFacade {
  private readonly store = inject(Store);

  readonly dashboardInfo$ = this.store.pipe(
    select(fromEmploymentStore.selectDashboardInfo),
  );

  readonly status$ = this.store.pipe(select(fromEmploymentStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(employmentActions.loadDashboard());
  }
}
