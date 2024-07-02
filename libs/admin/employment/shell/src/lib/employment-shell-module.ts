import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmploymentApiService } from '@dp/admin/employment/data-access';
import {
  EmploymentStoreEffects,
  EmploymentStoreFacade,
  employmentStore,
} from '@dp/admin/employment/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { GroupShellModule } from '@dp/shared/group/shell';
import { EMPLOYMENT_ROUTES } from './employment.routes';

@NgModule({
  imports: [RouterModule.forChild(EMPLOYMENT_ROUTES), GroupShellModule],
  providers: [
    provideState(employmentStore),
    provideEffects(EmploymentStoreEffects),
    EmploymentApiService,
    EmploymentStoreFacade,
  ],
})
export class EmploymentShellModule {}
