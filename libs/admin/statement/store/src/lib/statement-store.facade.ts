import { Injectable, inject } from '@angular/core';
import {
  InternshipApplyStatement,
  InternshipApplyStatementStatus,
  InternshipCheckStatement,
  InternshipCheckStatementStatus,
} from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { StatemntFilters } from './statement-store-state.interface';
import { statementActions } from './statement-store.actions';
import { fromStatementStore } from './statement-store.selectors';

@Injectable()
export class StatementStoreFacade {
  private readonly store = inject(Store);

  readonly internshipCheckStatements$ = this.store.pipe(
    select(fromStatementStore.selectAllFilteredInternshipCheckStatements),
  );

  readonly internshipApplyStatements$ = this.store.pipe(
    select(fromStatementStore.selectAllInternshipApplyStatements),
  );

  readonly groups$ = this.store.pipe(select(fromStatementStore.selectGroups));

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

  changeInternshipCheckStatus(
    statement: InternshipCheckStatement,
    newStatus:
      | InternshipCheckStatementStatus.Accepted
      | InternshipCheckStatementStatus.Declined,
  ): void {
    this.store.dispatch(
      statementActions.requestChangeInternshipCheckStatus({
        statement,
        newStatus,
      }),
    );
  }

  changeInternshipApplyStatus(
    statement: InternshipApplyStatement,
    newStatus:
      | InternshipApplyStatementStatus.Accepted
      | InternshipApplyStatementStatus.Declined,
  ): void {
    this.store.dispatch(
      statementActions.requestChangeInternshipApplyStatus({
        statement,
        newStatus,
      }),
    );
  }

  setFilters(filters: Partial<StatemntFilters>): void {
    this.store.dispatch(statementActions.setFilters({ filters }));
  }
}
