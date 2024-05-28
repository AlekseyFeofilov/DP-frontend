import { Injectable, inject } from '@angular/core';
import {
  InternshipApplyStatementApiService,
  InternshipCheckStatementApiService,
} from '@dp/admin/statement/data-access';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import {
  InternshipApplyStatementStatus,
  InternshipCheckStatementStatus,
} from '@dp/shared/statement/type';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { catchError, filter, map, of, switchMap } from 'rxjs';
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

  requestChangeInternshipCheckStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.requestChangeInternshipCheckStatus),
      switchMap(({ statement, newStatus }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: `Вы уверены, что хотите ${newStatus === InternshipCheckStatementStatus.Accepted ? 'подтвердить' : 'отклонить'} это заявление?`,
            size: 's',
            data: {
              content: `Заявление на прохождение практики от студента <b>${statement.student.name}</b> в компанию <b>"${statement.company.name}"</b> на позицию <b>"${statement.vacancy}"</b>`,
            },
          })
          .pipe(
            filter(close => close),
            map(() =>
              statementActions.changeInternshipCheckStatus({
                statement,
                newStatus,
              }),
            ),
          ),
      ),
    ),
  );

  changeInternshipCheckStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.changeInternshipCheckStatus),
      switchMap(({ statement, newStatus }) =>
        this.internshipCheckStatementApiService
          .changeStatus(
            StatementApiAdapterHelper.parseChangeInternshipCheckStatementStatusApiRequest(
              statement.id,
              newStatus,
            ),
          )
          .pipe(
            map(() =>
              notificationActions.success({
                message: `Заявление ${newStatus === InternshipCheckStatementStatus.Accepted ? 'подтверждено' : 'отклонено'}`,
              }),
            ),
            catchError(() =>
              of(
                notificationActions.error({
                  label: NOTIFICATION_TEXTS.edit.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  requestChangeApplyCheckStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.requestChangeInternshipApplyStatus),
      switchMap(({ statement, newStatus }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: `Вы уверены, что хотите ${newStatus === InternshipApplyStatementStatus.Accepted ? 'подтвердить' : 'отклонить'} это заявление?`,
            size: 's',
            data: {
              content: `Заявление на трудоустройство от студента <b>${statement.student.name}</b> в компанию <b>"${statement.baseStatement.company.name}"</b> на позицию <b>"${statement.baseStatement.vacancy}"</b>`,
            },
          })
          .pipe(
            filter(close => close),
            map(() =>
              statementActions.changeInternshipApplyStatus({
                statement,
                newStatus,
              }),
            ),
          ),
      ),
    ),
  );

  changeInternshipApplyStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(statementActions.changeInternshipApplyStatus),
      switchMap(({ statement, newStatus }) =>
        this.internshipApplyStatementApiService
          .changeStatus(
            StatementApiAdapterHelper.parseChangeInternshipApplyStatementStatusApiRequest(
              statement.id,
              newStatus,
            ),
          )
          .pipe(
            map(() =>
              notificationActions.success({
                message: `Заявление ${newStatus === InternshipApplyStatementStatus.Accepted ? 'подтверждено' : 'отклонено'}`,
              }),
            ),
            catchError(() =>
              of(
                notificationActions.error({
                  label: NOTIFICATION_TEXTS.edit.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
