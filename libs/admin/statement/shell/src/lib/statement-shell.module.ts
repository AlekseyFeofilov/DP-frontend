import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  InternshipApplyStatementApiService,
  InternshipCheckStatementApiService,
} from '@dp/admin/statement/data-access';
import {
  StatementStore,
  StatementStoreEffects,
  StatementStoreFacade,
} from '@dp/admin/statement/store';
import { GroupShellModule } from '@dp/shared/group/shell';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { STATEMENT_ROUTES } from './statement.routes';

@NgModule({
  imports: [RouterModule.forChild(STATEMENT_ROUTES), GroupShellModule],
  providers: [
    provideEffects(StatementStoreEffects),
    provideState(StatementStore),
    InternshipCheckStatementApiService,
    InternshipApplyStatementApiService,
    StatementStoreFacade,
  ],
})
export class StatementShellModule {}
