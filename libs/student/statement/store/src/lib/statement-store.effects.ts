import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { StatementApiService } from '@dp/student/statement/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { StatementApiAdapterHelper } from './statement-api-adapter.helper';
import { statementActions } from './statement-store.actions';

@Injectable()
export class StatementStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly statementApiService = inject(StatementApiService);

  createInternshipStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.createInternship),
      switchMap(({ newInternshipStatement, finishCallback }) =>
        this.statementApiService
          .createInternship(
            StatementApiAdapterHelper.parseCreateInternshipStatementApiRequest(
              newInternshipStatement,
            ),
          )
          .pipe(
            map(() => {
              finishCallback?.();

              return notificationActions.success({
                message: 'Заявление успешно создано',
              });
            }),
            catchError(() =>
              of(
                notificationActions.error({
                  label: NOTIFICATION_TEXTS.create.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
