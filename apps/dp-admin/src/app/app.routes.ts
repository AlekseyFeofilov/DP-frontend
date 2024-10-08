import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';

export const appRoutes: Route[] = [
  // {
  //   path: PATH_NAME.home,
  // },
  {
    path: PATH_NAME.internshipDiary,
    loadChildren: () =>
      import('@dp/admin/diary/shell').then(m => m.DiaryShellModule),
  },
  {
    path: PATH_NAME.statement,
    loadChildren: () =>
      import('@dp/admin/statement/shell').then(m => m.StatementShellModule),
  },
  {
    path: PATH_NAME.company,
    loadChildren: () =>
      import('@dp/admin/company/shell').then(m => m.CompanyShellModule),
  },
  {
    path: PATH_NAME.employment,
    loadChildren: () =>
      import('@dp/admin/employment/shell').then(m => m.EmploymentShellModule),
  },
  {
    path: PATH_NAME.student,
    loadChildren: () =>
      import('@dp/admin/student/shell').then(m => m.StudentShellModule),
  },
];
