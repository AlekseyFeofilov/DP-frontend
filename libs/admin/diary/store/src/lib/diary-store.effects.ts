import { Injectable, inject } from '@angular/core';
import { DiaryApiService } from '@dp/admin/diary/data-access';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tuiIsPresent } from '@taiga-ui/cdk';
import {
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  mergeMap,
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
      ofType(diaryActions.saveChanges),
      withLatestFrom(
        this.store.select(
          fromDiaryStore.selectSelectedInternshipDiaryStatementNewMark,
        ),
        this.store.select(
          fromDiaryStore.selectSelectedInternshipDiaryStatementNewStatus,
        ),
        this.store.select(
          fromDiaryStore.selectSelectedInternshipDiaryStatement,
        ),
      ),
      filter(
        ([_, mark, status, statement]) =>
          tuiIsPresent(statement) &&
          (tuiIsPresent(status) || tuiIsPresent(mark)),
      ),
      switchMap(([_, mark, status, statement]) => {
        const requests: Array<Observable<void>> = [];

        if (status) {
          requests.push(
            this.diaryApiService.changeStatementStatus(
              DiaryApiAdapterHelper.parseChangeInternshipDiaryStatementStatusApiRequest(
                statement!.id,
                status,
              ),
            ),
          );
        }

        if (mark) {
          requests.push(
            this.diaryApiService.changeMark(
              DiaryApiAdapterHelper.parseChangeInternshipDiaryMarkApiRequest(
                statement!.id,
                mark,
              ),
            ),
          );
        }

        return combineLatest(requests).pipe(
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
        );
      }),
    ),
  );
}
