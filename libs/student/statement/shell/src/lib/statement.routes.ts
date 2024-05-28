import { StatementRouteData } from '@dp/shared/statement/type';
import { RouteWithTypedData } from '@dp/shared/types';
import { PATH_NAME } from '@dp/student/shared/consts';

export const STATEMENT_ROUTES: RouteWithTypedData<StatementRouteData>[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/student/statement/pages').then(
        m => m.StatementCategoriesComponent,
      ),
  },
  {
    path: PATH_NAME.internshipCheck,
    data: {
      statementType: 'internshipCheck',
    },
    loadComponent: () =>
      import('@dp/student/statement/pages').then(m => m.AllStatementsComponent),
  },
  {
    path: `${PATH_NAME.internshipCheck}/${PATH_NAME.create}`,
    loadComponent: () =>
      import('@dp/student/statement/pages').then(
        m => m.NewInternshipStatementComponent,
      ),
  },
  {
    path: PATH_NAME.internshipApply,
    data: {
      statementType: 'internshipApply',
    },
    loadComponent: () =>
      import('@dp/student/statement/pages').then(m => m.AllStatementsComponent),
  },
];
