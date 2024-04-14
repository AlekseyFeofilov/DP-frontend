import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPANY_ROUTES } from './company.routes';

@NgModule({
  imports: [RouterModule.forChild(COMPANY_ROUTES)],
})
export class CompanyShellModule {}
