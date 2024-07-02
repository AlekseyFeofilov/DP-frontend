import { Injectable, inject } from '@angular/core';
import { EmploymentStatus } from '@dp/admin/employment/types';
import { StudentApiService } from '@dp/admin/student/data-access';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { alertActions } from '@dp/shared/effects';
import { GroupStoreFacade } from '@dp/shared/group/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs';
import { StudentApiAdapterHelper } from './student-api-adapter.helper';
import { studentActions } from './student-store.actions';
import { selectSelectedStudentInfo } from './student-store.selectors';

@Injectable()
export class StudentStoreEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly studentApiService = inject(StudentApiService);
  private readonly dialogService = inject(TuiDialogService);

  private readonly groupStoreFacade = inject(GroupStoreFacade);

  ngrxOnInitEffects(): Action {
    return studentActions.init();
  }

  setFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.init),
      switchMap(() =>
        this.groupStoreFacade.groups$.pipe(
          map(groups =>
            studentActions.setFilters({
              filters: { groupIds: groups.map(group => group.id) },
            }),
          ),
        ),
      ),
    ),
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.loadAll),
      switchMap(() =>
        this.studentApiService.getAllStudents().pipe(
          map(response => {
            const students =
              StudentApiAdapterHelper.parseAllStudentsApiResponse(response);

            return studentActions.loadAllSuccess({
              students,
            });
          }),
        ),
      ),
    ),
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.loadSelected),
      switchMap(({ id }) =>
        this.studentApiService.getStudentById(id).pipe(
          map(response => {
            const student =
              StudentApiAdapterHelper.parseStudentByIdApiResponseApiResponse(
                response,
              );

            return studentActions.loadSelectedSuccess({
              student,
            });
          }),
        ),
      ),
    ),
  );

  loadEmploymentHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.loadEmploymentHistory),
      switchMap(({ studentId }) =>
        this.studentApiService.getEmploymentHistory(studentId).pipe(
          map(response => {
            const employmentHistory =
              StudentApiAdapterHelper.parseEmploymentHistoryApiResponse(
                response,
              );

            return studentActions.loadEmploymentHistorySuccess({
              employmentHistory,
            });
          }),
        ),
      ),
    ),
  );

  loadInternhipDiaries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.loadInternhsipDiaries),
      switchMap(({ studentId }) =>
        this.studentApiService.getInternshipDiaries(studentId).pipe(
          map(response => {
            const internshipDiaries =
              StudentApiAdapterHelper.parseInternshipDiariesApiResponse(
                response,
              );

            return studentActions.loadInternhsipDiariesSuccess({
              internshipDiaries,
            });
          }),
        ),
      ),
    ),
  );

  requestCancelEmployment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.requestCancelEmployment),
      withLatestFrom(this.store.select(selectSelectedStudentInfo)),
      filter(([_, student]) => !!(student && student.employment)),
      switchMap(([_, student]) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content: `Активное трудоустройство студента перейдет в статус неактивных`,
            },
          })
          .pipe(
            filter(Boolean),
            map(() =>
              studentActions.cancelEmployment({
                employment: student!.employment!,
              }),
            ),
          ),
      ),
    ),
  );

  cancelEmployment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.cancelEmployment),
      switchMap(({ employment }) =>
        this.studentApiService
          .changeEmploymentStatus(
            StudentApiAdapterHelper.parseChangeEmploymentStatusApiRequest(
              employment,
              EmploymentStatus.Inactive,
            ),
          )
          .pipe(
            map(() =>
              alertActions.success({
                message: `Трудоустройство студента отменено`,
              }),
            ),
            catchError(() => [
              alertActions.error({
                label: NOTIFICATION_TEXTS.remove.error,
                message: NOTIFICATION_DESCRIPTION.error,
              }),
            ]),
          ),
      ),
    ),
  );
}
