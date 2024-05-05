import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatementApiService } from '@dp/student/statement/data-access';
import {
  StatementStoreEffects,
  StatementStoreFacade,
} from '@dp/student/statement/store';
import { provideEffects } from '@ngrx/effects';

import { STATEMENT_ROUTES } from './statement.routes';

@NgModule({
  imports: [RouterModule.forChild(STATEMENT_ROUTES)],
  providers: [
    provideEffects(StatementStoreEffects),
    StatementApiService,
    StatementStoreFacade,
  ],
})
export class StatementShellModule {}
