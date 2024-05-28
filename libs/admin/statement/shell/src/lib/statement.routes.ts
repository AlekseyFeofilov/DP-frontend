import { PATH_NAME } from '@dp/admin/shared/consts';
import { StatementRouteData } from '@dp/shared/statement/type';
import { RouteWithTypedData } from '@dp/shared/types';

export const STATEMENT_ROUTES: RouteWithTypedData<StatementRouteData>[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/admin/statement/pages').then(m => m.StatementLayoutComponent),

    children: [
      {
        path: '',
        redirectTo: PATH_NAME.internshipCheck,
        pathMatch: 'full',
      },
      {
        path: PATH_NAME.internshipCheck,
        data: {
          statementType: 'internshipCheck',
        },
        loadComponent: () =>
          import('@dp/admin/statement/pages').then(
            m => m.AllStatementsComponent,
          ),
      },
      {
        path: PATH_NAME.internshipApply,
        data: {
          statementType: 'internshipApply',
        },
        loadComponent: () =>
          import('@dp/admin/statement/pages').then(
            m => m.AllStatementsComponent,
          ),
      },
    ],
  },
];
