import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';

export const STATEMENT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/student/statement/pages').then(
        m => m.StatementLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@dp/student/statement/pages').then(
            m => m.AllStatementsComponent,
          ),
      },
      {
        path: PATH_NAME.create,
        loadComponent: () =>
          import('@dp/student/statement/pages').then(
            m => m.StatementCategoriesComponent,
          ),
      },
    ],
  },
  {
    path: `${PATH_NAME.create}/${PATH_NAME.internship}`,
    loadComponent: () =>
      import('@dp/student/statement/pages').then(
        m => m.NewInternshipStatementComponent,
      ),
  },
];
