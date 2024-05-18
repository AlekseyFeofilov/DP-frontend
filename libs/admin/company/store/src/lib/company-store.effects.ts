import { Injectable, inject } from '@angular/core';
import { CompanyApiService } from '@dp/admin/company/data-access';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { CompanyCommonApiService } from '@dp/shared/company/data-access';
import { CompanyApiAdapterHelper } from './company-api-adapter.helper';
import { companyActions } from './company-store.actions';

@Injectable()
export class CompanyStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly companyApiService = inject(CompanyApiService);
  private readonly companyCommonApiService = inject(CompanyCommonApiService);
  private readonly dialogService = inject(TuiDialogService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyActions.loadAll),
      switchMap(() =>
        this.companyCommonApiService.getAll().pipe(
          map(response => {
            const companies =
              CompanyApiAdapterHelper.parseAllCompaniesApiResponse(response);

            return companyActions.loadAllSuccess({
              companies,
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
      ofType(companyActions.loadSelected),
      switchMap(({ id }) =>
        this.companyCommonApiService.getById(id).pipe(
          map(response => {
            const company =
              CompanyApiAdapterHelper.parseCompanyByIdApiResponse(response);

            return companyActions.loadSelectedSuccess({
              company,
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
      ofType(companyActions.create),
      switchMap(({ newCompany, finishCallback }) =>
        this.companyApiService
          .create(
            CompanyApiAdapterHelper.parseCreateCompanyApiRequest(newCompany),
          )
          .pipe(
            map(() => {
              finishCallback?.();

              return notificationActions.success({
                message: 'Компания успешно созадна',
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
      ofType(companyActions.edit),
      switchMap(({ id, newCompany, finishCallback }) =>
        this.companyApiService
          .edit(
            CompanyApiAdapterHelper.parseEditCompanyApiRequest(id, newCompany),
          )
          .pipe(
            map(() => {
              finishCallback?.();

              return notificationActions.success({
                message: 'Компания успешно отредактирована',
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
      ofType(companyActions.requestRemove),
      switchMap(({ company }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content: `Удаленную компанию "${company.name}" не получится восстановить`,
            },
          })
          .pipe(
            filter(close => close),
            map(() => companyActions.remove({ company })),
          ),
      ),
    ),
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyActions.remove),
      switchMap(({ company }) =>
        this.companyApiService.delete({ id: company.id }).pipe(
          map(() =>
            notificationActions.success({
              message: `Компания "${company.name}" удалена`,
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
