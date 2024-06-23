import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';

export const DIARY_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/student/diary/pages').then(
        m => m.AllInternshipDiaryStatementsComponent,
      ),
  },
  {
    path: PATH_NAME.internshipDiaryId,
    loadComponent: () =>
      import('@dp/student/diary/pages').then(
        m => m.InternshipDiaryStatementComponent,
      ),
  },
];
