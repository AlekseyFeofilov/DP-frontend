import { Injectable, inject } from '@angular/core';
import { EmploymentApiService } from '@dp/admin/employment/data-access';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { GroupStoreFacade } from '@dp/shared/group/store';
import { Action } from '@ngrx/store';
import { EmploymentApiAdapterHelper } from './employment-api-adapter.helper';
import { employmentActions } from './employment-store.actions';

@Injectable()
export class EmploymentStoreEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly employmentApiService = inject(EmploymentApiService);
  private readonly groupStoreFacade = inject(GroupStoreFacade);

  ngrxOnInitEffects(): Action {
    return employmentActions.init();
  }

  setFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentActions.init),
      switchMap(() =>
        this.groupStoreFacade.groups$.pipe(
          map(groups =>
            employmentActions.setFilters({
              filters: { groupIds: groups.map(group => group.id) },
            }),
          ),
        ),
      ),
    ),
  );

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentActions.loadDashboard),
      switchMap(() =>
        this.employmentApiService.getDashboardInfo().pipe(
          map(response => {
            const dashboardInfo =
              EmploymentApiAdapterHelper.parseDashboardInfoApiResponse(
                response,
              );

            return employmentActions.loadDashboardInfoSuccess({
              dashboardInfo,
            });
          }),
        ),
      ),
    ),
  );
}
