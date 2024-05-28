import { Injectable, inject } from '@angular/core';
import { EmploymentApiService } from '@dp/admin/employment/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, switchMap } from 'rxjs';

import { EmploymentApiAdapterHelper } from './employment-api-adapter.helper';
import { employmentActions } from './employment-store.actions';

@Injectable()
export class EmploymentStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly employmentApiService = inject(EmploymentApiService);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentActions.loadDashboard),
      switchMap(() =>
        this.employmentApiService.getDashboardInfo().pipe(
          exhaustMap(response => {
            const dashboardInfo =
              EmploymentApiAdapterHelper.parseDashboardInfoApiResponse(
                response,
              );

            const dashboardFilters =
              EmploymentApiAdapterHelper.parseDashboardFiltersApiResponse(
                response,
              );

            return [
              employmentActions.loadDashboardFiltersSuccess({
                dashboardFilters,
              }),
              employmentActions.loadDashboardInfoSuccess({
                dashboardInfo,
              }),
            ];
          }),

          // catchError(() => {
          //   this.analytics.sendNextPageLoaded(false);

          //   return [driversListActions.loadItemsFailure()];
          // }),
        ),
      ),
    ),
  );
}
