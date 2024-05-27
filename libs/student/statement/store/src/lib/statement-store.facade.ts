import { Injectable, inject } from '@angular/core';
import { InternshipCheckStatement } from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
import { NewIntrenshipCheckStatement } from '@dp/student/statement/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { statementActions } from './statement-store.actions';
import { fromStatementStore } from './statement-store.selectors';

@Injectable()
export class StatementStoreFacade {
  private readonly store = inject(Store);

  readonly internshipCheckStatements$ = this.store.pipe(
    select(fromStatementStore.selectAllInternshipCheckStatements),
  );
  readonly internshipApplyStatements$ = this.store.pipe(
    select(fromStatementStore.selectAllInternshipApplyStatements),
  );

  readonly status$ = this.store.pipe(select(fromStatementStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  loadAllInternshipCheck(): void {
    this.store.dispatch(statementActions.loadAllInternshipCheck());
  }

  loadAllInternshipApply(): void {
    this.store.dispatch(statementActions.loadAllInternshipApply());
  }

  createInternshipCheck(
    newInternshipCheckStatement: NewIntrenshipCheckStatement,
    finishCallback?: () => void,
  ): void {
    this.store.dispatch(
      statementActions.createInternshipCheck({
        newInternshipCheckStatement,
        finishCallback,
      }),
    );
  }

  createInternshipApply(baseStatement: InternshipCheckStatement): void {
    this.store.dispatch(
      statementActions.requestCreateInternshipApply({
        baseStatement,
      }),
    );
  }
}
