import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMPLOYMENT_ROUTES } from './employment.routes';

@NgModule({
  imports: [RouterModule.forChild(EMPLOYMENT_ROUTES)],
})
export class EmploymentShellModule {}
