import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { StudentStoreFacade } from '@dp/admin/student/store';
import { normalizeRouteParam } from '@dp/shared/core';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-internship-diaries',
  standalone: true,
  imports: [CommonModule, TuiLinkModule, RouterLink],
  templateUrl: './internship-diaries.component.html',
  styleUrl: './internship-diaries.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiariesComponent implements OnInit {
  private readonly studentStoreFacade = inject(StudentStoreFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly intersnhipDiaries$ = this.studentStoreFacade.intersnhipDiaries$;

  ngOnInit(): void {
    const studentId =
      this.route.parent?.snapshot.params[
        normalizeRouteParam(PATH_NAME.studentId)
      ];

    if (!studentId) {
      this.router.navigate([PATH_NAME.student]);
      return;
    }

    this.studentStoreFacade.loadInternshipDiaries(studentId);
  }

  @tuiPure
  getDiaryPath(id: string): string[] {
    return ['/', PATH_NAME.internshipDiary, id];
  }
}
