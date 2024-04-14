import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';

export const appRoutes: Route[] = [
  // {
  //   path: PATH_NAME.home,
  // },
  {
    path: PATH_NAME.company,
    loadChildren: () =>
      import('@dp/admin/company/shell').then(m => m.CompanyShellModule),
  },
];
