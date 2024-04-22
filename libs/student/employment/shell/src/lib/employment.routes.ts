import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';

export const EMPLOYMENT_ROUTES: Route[] = [
  {
    path: PATH_NAME.request,
    children: [
      {
        path: PATH_NAME.create,
        loadComponent: () =>
          import('@dp/student/employment/pages').then(
            m => m.NewEmploymentRequestComponent,
          ),
      },
    ],
  },
];
