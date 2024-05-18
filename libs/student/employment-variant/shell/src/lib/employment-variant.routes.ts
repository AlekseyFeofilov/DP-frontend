import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';

export const EMPLOYMENT_VARIANTS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/student/employment-variant/pages').then(
        m => m.AllEmploymentVariantsComponent,
      ),
  },
  {
    path: PATH_NAME.create,
    loadComponent: () =>
      import('@dp/student/employment-variant/pages').then(
        m => m.NewEmploymentVariantComponent,
      ),
  },
  {
    path: `${PATH_NAME.employmentVariantId}/${PATH_NAME.edit}`,
    loadComponent: () =>
      import('@dp/student/employment-variant/pages').then(
        m => m.EditEmploymentVariantComponent,
      ),
  },
];
