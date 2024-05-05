import { Injectable, inject } from '@angular/core';
import { NewIntrenshipStatement } from '@dp/student/statement/types';
import { Store } from '@ngrx/store';

import { statementActions } from './statement-store.actions';

@Injectable()
export class StatementStoreFacade {
  private readonly store = inject(Store);

  createInternship(
    newInternshipStatement: NewIntrenshipStatement,
    finishCallback?: () => void,
  ): void {
    this.store.dispatch(
      statementActions.createInternship({
        newInternshipStatement,
        finishCallback,
      }),
    );
  }
}
