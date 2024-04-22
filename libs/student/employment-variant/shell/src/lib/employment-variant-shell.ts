import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMPLOYMENT_VARIANTS_ROUTES } from './employment-variant.routes';

@NgModule({
  imports: [RouterModule.forChild(EMPLOYMENT_VARIANTS_ROUTES)],
})
export class EmploymentVariantShellModule {}
