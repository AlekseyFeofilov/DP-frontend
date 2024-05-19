import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmploymentVariantApiService } from '@dp/student/employment-variant/data-access';
import {
  EmploymentVariantStoreEffects,
  EmploymentVariantStoreFacade,
  employmentVariantStore,
} from '@dp/student/employment-variant/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EMPLOYMENT_VARIANTS_ROUTES } from './employment-variant.routes';

@NgModule({
  imports: [RouterModule.forChild(EMPLOYMENT_VARIANTS_ROUTES)],
  providers: [
    provideState(employmentVariantStore),
    provideEffects(EmploymentVariantStoreEffects),
    EmploymentVariantApiService,
    EmploymentVariantStoreFacade,
  ],
})
export class EmploymentVariantShellModule {}
