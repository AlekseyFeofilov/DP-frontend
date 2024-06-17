import { Injectable, inject } from '@angular/core';
import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
import { Store } from '@ngrx/store';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { combineLatest, map } from 'rxjs';
import { diaryActions } from './diary-store.actions';
import { fromDiaryStore } from './diary-store.selectors';

@Injectable()
export class DiaryStoreFacade {
  private readonly store = inject(Store);

  readonly internshipDiaryStatements$ = this.store.select(
    fromDiaryStore.selectAllInternshipDiaryStatements,
  );

  readonly selectedInternshipDiaryStatement$ = this.store.select(
    fromDiaryStore.selectSelectedInternshipDiaryStatement,
  );

  readonly isFieldsDirty$ = combineLatest([
    this.store.select(
      fromDiaryStore.selectSelectedInternshipDiaryStatementNewStatus,
    ),
    this.store.select(
      fromDiaryStore.selectSelectedInternshipDiaryStatementNewMark,
    ),
  ]).pipe(map(([status, mark]) => tuiIsPresent(status) || tuiIsPresent(mark)));

  readonly status$ = this.store.select(fromDiaryStore.selectStatus);
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(diaryActions.loadAll());
  }

  loadById(id: string): void {
    this.store.dispatch(diaryActions.loadSelected({ id }));
  }

  changeStatus(status: InternshipDiaryStatementStatus): void {
    this.store.dispatch(diaryActions.setStatus({ status }));
  }

  changeMark(mark: number): void {
    this.store.dispatch(diaryActions.setMark({ mark }));
  }

  saveChanges(): void {
    this.store.dispatch(diaryActions.saveChanges());
  }
}
