import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { DiaryApiService } from '@dp/student/diary/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { DiaryApiAdapterHelper } from './diary-api-adapter.helper';
import { diaryActions } from './diary-store.actions';
import { fromDiaryStore } from './diary-store.selectors';

@Injectable()
export class DiaryStoreEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly diaryApiService = inject(DiaryApiService);
  private readonly dialogService = inject(TuiDialogService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.loadAll),
      switchMap(() =>
        this.diaryApiService.getAllStatements().pipe(
          map(response => {
            const internshipDiaryStatements =
              DiaryApiAdapterHelper.parseAllInternshipDiaryStatementsApiResponse(
                response,
              );

            return diaryActions.loadAllSuccess({
              internshipDiaryStatements,
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

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.loadSelected),
      switchMap(({ id }) =>
        this.diaryApiService.getStatementById({ id }).pipe(
          map(response => {
            const internshipDiaryStatement =
              DiaryApiAdapterHelper.parseInternshipDiaryStatementByIdApiResponse(
                response,
              );

            return diaryActions.loadSelectedSuccess({
              internshipDiaryStatement,
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

  saveChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.setStatus),
      withLatestFrom(
        this.store.select(
          fromDiaryStore.selectSelectedInternshipDiaryStatement,
        ),
      ),
      filter(([_, statement]) => tuiIsPresent(statement)),
      switchMap(([{ status }, statement]) =>
        this.diaryApiService
          .changeStatementStatus(
            DiaryApiAdapterHelper.parseChangeInternshipDiaryStatementStatusApiRequest(
              statement!.id,
              status,
            ),
          )
          .pipe(
            mergeMap(() => {
              return [
                notificationActions.success({
                  message: 'Изменения успешно сохранены',
                }),
                diaryActions.saveChangesSuccess(),
              ];
            }),
            catchError(() => [
              notificationActions.error({
                label: NOTIFICATION_TEXTS.edit.error,
                message: NOTIFICATION_DESCRIPTION.error,
              }),
            ]),
          ),
      ),
    ),
  );

  createStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.create),
      switchMap(({ newIntrenshipDiaryStatement }) => {
        const request =
          DiaryApiAdapterHelper.parseCreateInternshipDiaryStatementApiRequest(
            newIntrenshipDiaryStatement,
          );

        return this.diaryApiService.createStatement(request).pipe(
          mergeMap(() => [
            diaryActions.loadAll(),
            notificationActions.success({
              message: `Заявление по ${newIntrenshipDiaryStatement.semester} семестру создано`,
            }),
          ]),
          catchError(() => [
            notificationActions.error({
              label: NOTIFICATION_TEXTS.create.error,
              message: NOTIFICATION_DESCRIPTION.error,
            }),
          ]),
        );
      }),
    ),
  );

  createTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.createTemplate),
      switchMap(({ semester, newInternshipDiaryTemplate }) => {
        const request =
          DiaryApiAdapterHelper.parseCreateInternshipDiaryTempalteApiRequestApiRequest(
            semester,
            newInternshipDiaryTemplate,
          );

        return this.diaryApiService.createTemplate(request).pipe(
          mergeMap(() => [
            diaryActions.loadSelected({
              id: newInternshipDiaryTemplate.statementId,
            }),
            notificationActions.success({
              message: 'Изменения успешно сохранены',
            }),
          ]),
          catchError(() => [
            notificationActions.error({
              label: NOTIFICATION_TEXTS.create.error,
              message: NOTIFICATION_DESCRIPTION.error,
            }),
          ]),
        );
      }),
    ),
  );

  requestRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.requestRemove),
      switchMap(({ internshipDiaryStatement }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content: 'Данные по заявке не сохранятся',
            },
          })
          .pipe(
            filter(Boolean),
            map(() => diaryActions.remove({ internshipDiaryStatement })),
          ),
      ),
    ),
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diaryActions.remove),
      switchMap(({ internshipDiaryStatement }) =>
        this.diaryApiService
          .deleteStatement({ id: internshipDiaryStatement.id })
          .pipe(
            map(() =>
              notificationActions.success({
                message: `Заявление по ${internshipDiaryStatement.semester} семестру удалено`,
              }),
            ),
            catchError(() =>
              of(
                notificationActions.error({
                  label: NOTIFICATION_TEXTS.remove.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
