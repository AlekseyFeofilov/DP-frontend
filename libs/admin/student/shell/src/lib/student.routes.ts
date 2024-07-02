import { Route } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';

export const STUDENT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/admin/student/pages').then(m => m.AllStudentsComponent),
  },
  {
    path: PATH_NAME.studentId,
    pathMatch: 'full',
    redirectTo: `${PATH_NAME.studentId}/${PATH_NAME.employmentHistory}`,
  },
  {
    path: PATH_NAME.studentId,
    loadComponent: () =>
      import('@dp/admin/student/pages').then(
        m => m.StudentProfileLayoutComponent,
      ),

    children: [
      {
        path: PATH_NAME.employmentHistory,
        loadComponent: () =>
          import('@dp/admin/student/ui').then(
            m => m.EmploymentHistoryComponent,
          ),
      },
      {
        path: PATH_NAME.internshipDiary,
        loadComponent: () =>
          import('@dp/admin/student/ui').then(
            m => m.InternshipDiariesComponent,
          ),
      },
    ],
  },
];
