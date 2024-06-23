import { Injectable, inject } from '@angular/core';
import {
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
} from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
import { NewInternshipDiaryTemplate } from '@dp/student/diary/types';
import { NewIntrenshipDiaryStatement } from '@dp/student/statement/types';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
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

  create(newIntrenshipDiaryStatement: NewIntrenshipDiaryStatement): void {
    this.store.dispatch(diaryActions.create({ newIntrenshipDiaryStatement }));
  }

  remove(internshipDiaryStatement: InternshipDiaryStatement): void {
    this.store.dispatch(
      diaryActions.requestRemove({ internshipDiaryStatement }),
    );
  }

  createTemplate(
    semester: number,
    newInternshipDiaryTemplate: NewInternshipDiaryTemplate,
  ): void {
    this.store.dispatch(
      diaryActions.createTemplate({ semester, newInternshipDiaryTemplate }),
    );
  }
}
