import {
  EmploymentStoreFacade,
  employmentStore,
} from '@dp/admin/employment/store';
import { EmploymentApiService } from '@dp/admin/employment/data-access';
import { EmploymentStoreEffects } from '@dp/admin/employment/store';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { EMPLOYMENT_ROUTES } from './employment.routes';

@NgModule({
  imports: [RouterModule.forChild(EMPLOYMENT_ROUTES)],
  providers: [
    provideState(employmentStore),
    provideEffects(EmploymentStoreEffects),
    EmploymentApiService,
    EmploymentStoreFacade,
  ],
})
export class EmploymentShellModule {}
