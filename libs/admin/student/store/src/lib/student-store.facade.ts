import { Injectable, inject } from '@angular/core';
import { StoreStateStatus } from '@dp/shared/types';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { studentActions } from './student-store.actions';
import { fromStudentStore } from './student-store.selectors';

@Injectable()
export class StudentStoreFacade {
  private readonly store = inject(Store);

  readonly students$ = this.store.select(fromStudentStore.selectAllStudents);

  readonly selectedStudentInfo$ = this.store.select(
    fromStudentStore.selectSelectedStudentInfo,
  );

  readonly employmentHistory$ = this.store.select(
    fromStudentStore.selectEmploymentHistory,
  );

  readonly intersnhipDiaries$ = this.store.select(
    fromStudentStore.selectIntenrshipDiaries,
  );

  readonly status$ = this.store.select(fromStudentStore.selectStatus);
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  loadAll(): void {
    this.store.dispatch(studentActions.loadAll());
  }

  loadById(id: string): void {
    this.store.dispatch(studentActions.loadSelected({ id }));
  }

  loadEmploymentHistory(studentId: string): void {
    this.store.dispatch(studentActions.loadEmploymentHistory({ studentId }));
  }

  loadInternshipDiaries(studentId: string): void {
    this.store.dispatch(studentActions.loadInternhsipDiaries({ studentId }));
  }

  cancelEmployment(): void {
    this.store.dispatch(studentActions.requestCancelEmployment());
  }
}
