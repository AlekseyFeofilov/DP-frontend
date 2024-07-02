import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmploymentStatus } from '@dp/admin/employment/types';
import {
  INTERNSHIP_APPLY_STATEMENT_ABSOLUTE_PATH,
  INTERNSHIP_CHECK_STATEMENT_ABSOLUTE_PATH,
  PATH_NAME,
} from '@dp/admin/shared/consts';
import { StudentStoreFacade } from '@dp/admin/student/store';
import { normalizeRouteParam } from '@dp/shared/core';
import { TuiMapperPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';

@Component({
  selector: 'dp-employment-history',
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    RouterLink,
    TuiMapperPipeModule,
    TuiLinkModule,
  ],
  templateUrl: './employment-history.component.html',
  styleUrl: './employment-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentHistoryComponent implements OnInit {
  private readonly studentStoreFacade = inject(StudentStoreFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly employmentHistory$ = this.studentStoreFacade.employmentHistory$;

  ngOnInit(): void {
    const studentId =
      this.route.parent?.snapshot.params[
        normalizeRouteParam(PATH_NAME.studentId)
      ];

    if (!studentId) {
      this.router.navigate([PATH_NAME.student]);
      return;
    }

    this.studentStoreFacade.loadEmploymentHistory(studentId);
  }

  @tuiPure
  get internshipApplyStatementPath(): string[] {
    return INTERNSHIP_APPLY_STATEMENT_ABSOLUTE_PATH;
  }

  @tuiPure
  get internshipCheckStatementPath(): string[] {
    return INTERNSHIP_CHECK_STATEMENT_ABSOLUTE_PATH;
  }

  isActive(status: EmploymentStatus | undefined): boolean {
    return status === EmploymentStatus.Active;
  }
}
