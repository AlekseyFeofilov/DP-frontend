import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { StudentStoreFacade } from '@dp/admin/student/store';
import { normalizeRouteParam } from '@dp/shared/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import {
  TuiAutoColorModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiButtonModule,
  TuiInitialsModule,
} from '@taiga-ui/experimental';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'dp-student-profile-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiLoaderModule,
    TuiAvatarModule,
    TuiInitialsModule,
    TuiLetModule,
    TuiAutoColorModule,
    TuiTabsModule,
    RouterLink,
    TuiButtonModule,
    TuiBadgeModule,
  ],
  templateUrl: './student-profile-layout.component.html',
  styleUrl: './student-profile-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProfileLayoutComponent implements OnInit {
  private readonly studentStoreFacade = inject(StudentStoreFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly studentInfo$ = this.studentStoreFacade.selectedStudentInfo$;
  readonly isLoading$ = this.studentStoreFacade.isLoading$;

  readonly paths = PATH_NAME;

  ngOnInit(): void {
    const studentId =
      this.route.snapshot.params[normalizeRouteParam(PATH_NAME.studentId)];

    if (!studentId) {
      this.router.navigate([PATH_NAME.student]);
      return;
    }

    this.studentStoreFacade.loadById(studentId);
  }

  cancelEmployment(): void {
    this.studentStoreFacade.cancelEmployment();
  }
}
