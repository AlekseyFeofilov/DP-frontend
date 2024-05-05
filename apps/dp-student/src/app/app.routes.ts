import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';

export const appRoutes: Route[] = [
  // {
  //   path: PATH_NAME.home,
  // },
  {
    path: PATH_NAME.statement,
    loadChildren: () =>
      import('@dp/student/statement/shell').then(m => m.StatementShellModule),
  },
  {
    path: PATH_NAME.employmentVariant,
    loadChildren: () =>
      import('@dp/student/employment-variant/shell').then(
        m => m.EmploymentVariantShellModule,
      ),
  },
];
