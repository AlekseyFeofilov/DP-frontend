import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyApiService } from '@dp/admin/company/data-access';
import {
  CompanyStoreEffects,
  CompanyStoreFacade,
  companyStore,
} from '@dp/admin/company/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { CompanyCommonApiService } from '@dp/shared/company/data-access';
import { COMPANY_ROUTES } from './company.routes';

@NgModule({
  imports: [RouterModule.forChild(COMPANY_ROUTES)],
  providers: [
    provideState(companyStore),
    provideEffects(CompanyStoreEffects),
    CompanyStoreFacade,
    CompanyApiService,
    CompanyCommonApiService,
  ],
})
export class CompanyShellModule {}
