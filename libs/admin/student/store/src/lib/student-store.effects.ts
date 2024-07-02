import { Injectable, inject } from '@angular/core';
import { StudentApiService } from '@dp/admin/student/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { StudentApiAdapterHelper } from './student-api-adapter.helper';
import { studentActions } from './student-store.actions';

@Injectable()
export class StudentStoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly studentApiService = inject(StudentApiService);

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
}
