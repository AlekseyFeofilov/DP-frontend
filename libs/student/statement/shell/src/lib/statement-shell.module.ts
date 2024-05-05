import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { STATEMENT_ROUTES } from './statement.routes';

@NgModule({
  imports: [RouterModule.forChild(STATEMENT_ROUTES)],
})
export class StatementShellModule {}
