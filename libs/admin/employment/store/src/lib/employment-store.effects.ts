import { EmploymentApiService } from '@dp/admin/employment/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';

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
          map(response => {
            const dashboard =
              EmploymentApiAdapterHelper.parseDashboardInfoApiResponse(
                response,
              );

            return employmentActions.loadDashboardSuccess({
              dashboard,
            });
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
