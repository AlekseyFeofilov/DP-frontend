import {
  CompanyStoreEffects,
  CompanyStoreFacade,
  companyStore,
} from '@dp/admin/company/store';
import { CompanyApiService } from '@dp/admin/company/data-access';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { COMPANY_ROUTES } from './company.routes';

@NgModule({
  imports: [RouterModule.forChild(COMPANY_ROUTES)],
  providers: [
    provideState(companyStore),
    provideEffects(CompanyStoreEffects),
    CompanyStoreFacade,
    CompanyApiService,
  ],
})
export class CompanyShellModule {}
