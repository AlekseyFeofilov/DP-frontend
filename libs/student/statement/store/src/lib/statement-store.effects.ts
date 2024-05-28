import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import {
  InternshipApplyStatementApiService,
  InternshipCheckStatementApiService,
} from '@dp/student/statement/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { StatementApiAdapterHelper } from './statement-api-adapter.helper';
import { statementActions } from './statement-store.actions';

@Injectable()
export class StatementStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly dialogService = inject(TuiDialogService);
  private readonly internshipCheckStatementApiService = inject(
    InternshipCheckStatementApiService,
  );
  private readonly internshipApplyStatementApiService = inject(
    InternshipApplyStatementApiService,
  );

  loadAllInternshipCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.loadAllInternshipCheck),
      switchMap(() =>
        this.internshipCheckStatementApiService.getAll().pipe(
          map(response => {
            const internshipCheckStatements =
              StatementApiAdapterHelper.parseAllInternshipCheckStatementsApiResponse(
                response,
              );

            return statementActions.loadAllInternshipCheckSuccess({
              internshipCheckStatements,
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

  loadAllInternshipApply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.loadAllInternshipApply),
      switchMap(() =>
        this.internshipApplyStatementApiService.getAll().pipe(
          map(response => {
            const internshipApplyStatements =
              StatementApiAdapterHelper.parseAllInternshipApplyStatementsApiResponse(
                response,
              );

            return statementActions.loadAllInternshipApplySuccess({
              internshipApplyStatements,
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

  createInternshipCheckStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.createInternshipCheck),
      switchMap(({ newInternshipCheckStatement, finishCallback }) =>
        this.internshipCheckStatementApiService
          .createStatement(
            StatementApiAdapterHelper.parseCreateInternshipCheckStatementApiRequest(
              newInternshipCheckStatement,
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

  requestCreateInternshipApplyStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.requestCreateInternshipApply),
      switchMap(({ baseStatement }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content: `На основе этого заявления создастся заявление о трудоустройстве в компании <b>"${baseStatement.company.name}"</b> на позицию <b>"${baseStatement.vacancy}"</b> и отправится на проверку в деканат`,
            },
          })
          .pipe(
            filter(close => close),
            map(() =>
              statementActions.createInternshipApply({ baseStatement }),
            ),
          ),
      ),
    ),
  );

  createInternshipApplyStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.createInternshipApply),
      switchMap(({ baseStatement }) =>
        this.internshipApplyStatementApiService
          .createStatement(
            StatementApiAdapterHelper.parseCreateInternshipApplyStatementApiRequest(
              baseStatement.id,
            ),
          )
          .pipe(
            map(() =>
              notificationActions.success({
                message: 'Заявление успешно создано',
              }),
            ),
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
