import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { EmploymentVariantApiService } from '@dp/student/employment-variant/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { EmploymentVariantApiAdapterHelper } from './employment-variant-api-adapter.helper';
import { employmentVariantActions } from './employment-variant-store.actions';

@Injectable()
export class EmploymentVariantStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly employmentVariantApiService = inject(
    EmploymentVariantApiService,
  );
  private readonly dialogService = inject(TuiDialogService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentVariantActions.loadAll),
      switchMap(() =>
        this.employmentVariantApiService.getAll().pipe(
          map(response => {
            const employmentVariants =
              EmploymentVariantApiAdapterHelper.parseAllEmploymentVariantsApiResponse(
                response,
              );

            return employmentVariantActions.loadAllSuccess({
              employmentVariants,
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
      ofType(employmentVariantActions.loadSelected),
      switchMap(({ id }) =>
        this.employmentVariantApiService.getById({ id }).pipe(
          map(response => {
            const employmentVariant =
              EmploymentVariantApiAdapterHelper.parseEmploymentVariantByIdApiResponse(
                response,
              );

            return employmentVariantActions.loadSelectedSuccess({
              employmentVariant,
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

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentVariantActions.create),
      switchMap(({ newEmploymentVariant, finishCallback }) =>
        this.employmentVariantApiService
          .create(
            EmploymentVariantApiAdapterHelper.parseCreateEmploymentVariantApiRequest(
              newEmploymentVariant,
            ),
          )
          .pipe(
            map(() => {
              finishCallback?.();

              return notificationActions.success({
                message: 'Вариант трудоустройства успешно созадн',
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

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentVariantActions.edit),
      switchMap(({ id, newEmploymentVariant, finishCallback }) =>
        this.employmentVariantApiService
          .edit(
            EmploymentVariantApiAdapterHelper.parseEditEmploymentVariantApiRequest(
              id,
              newEmploymentVariant,
            ),
          )
          .pipe(
            map(() => {
              finishCallback?.();

              return notificationActions.success({
                message: 'Вариант трудоустройства успешно отредактирован',
              });
            }),
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

  requestRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentVariantActions.requestRemove),
      switchMap(({ employmentVariant }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content: `Удаленный вариант трудоустройства в компанию ${employmentVariant.company.name} не получится восстановить`,
            },
          })
          .pipe(
            filter(close => close),
            map(() => employmentVariantActions.remove({ employmentVariant })),
          ),
      ),
    ),
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employmentVariantActions.remove),
      switchMap(({ employmentVariant }) =>
        this.employmentVariantApiService
          .delete({ id: employmentVariant.id })
          .pipe(
            map(() =>
              notificationActions.success({
                message: `Вариант трудоустройства в компанию ${employmentVariant.company.name} удален`,
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
