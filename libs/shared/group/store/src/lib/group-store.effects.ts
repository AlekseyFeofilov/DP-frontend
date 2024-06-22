import { Injectable, inject } from '@angular/core';

import { GroupApiService } from '@dp/shared/group/data-access';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { GroupApiAdapterHelper } from './group-api-adapter.helper';
import { groupActions } from './group-store.actions';

@Injectable()
export class GrouptStoreEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);

  private readonly groupApiService = inject(GroupApiService);

  ngrxOnInitEffects(): Action {
    return groupActions.loadGroups();
  }

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.loadGroups),
      switchMap(() =>
        this.groupApiService.getAll().pipe(
          map(response => {
            const groups =
              GroupApiAdapterHelper.parseAllGroupsApiResponse(response);

            return groupActions.loadGroupsSuccess({ groups });
          }),
        ),
      ),
    ),
  );
}
