import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';

export const COMPANY_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/admin/company/pages').then(m => m.AllCompaniesComponent),
  },
  {
    path: PATH_NAME.create,
    loadComponent: () =>
      import('@dp/admin/company/pages').then(m => m.NewCompanyComponent),
  },
  {
    path: `${PATH_NAME.companyId}/${PATH_NAME.edit}`,
    loadComponent: () =>
      import('@dp/admin/company/pages').then(m => m.EditCompanyComponent),
  },
];
