import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  InternshipApplyStatementApiService,
  InternshipCheckStatementApiService,
} from '@dp/student/statement/data-access';
import {
  StatementStore,
  StatementStoreEffects,
  StatementStoreFacade,
} from '@dp/student/statement/store';
import { provideEffects } from '@ngrx/effects';

import { provideState } from '@ngrx/store';
import { STATEMENT_ROUTES } from './statement.routes';

@NgModule({
  imports: [RouterModule.forChild(STATEMENT_ROUTES)],
  providers: [
    provideEffects(StatementStoreEffects),
    provideState(StatementStore),
    InternshipCheckStatementApiService,
    InternshipApplyStatementApiService,
    StatementStoreFacade,
  ],
})
export class StatementShellModule {}
