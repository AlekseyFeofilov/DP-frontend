import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { normalizeRouteParam } from '@dp/shared/core';
import { DiaryStoreFacade } from '@dp/student/diary/store';
import { InternshipDiaryInfoStatementComponent } from '@dp/student/diary/ui';
import { PATH_NAME } from '@dp/student/shared/consts';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-internship-diary-statement',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    InternshipDiaryInfoStatementComponent,
  ],
  templateUrl: './internship-diary-statement.component.html',
  styleUrl: './internship-diary-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatementComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);

  readonly isLoading$ = this.diaryStoreFacade.isLoading$;

  statementId!: string;

  ngOnInit(): void {
    this.statementId =
      this.route.snapshot.params[
        normalizeRouteParam(PATH_NAME.internshipDiaryId)
      ];

    if (!this.statementId) {
      this.router.navigate([PATH_NAME.internshipDiary]);
      return;
    }

    this.diaryStoreFacade.loadById(this.statementId);
  }
}
