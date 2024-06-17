import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryStoreFacade } from '@dp/admin/diary/store';
import { InternshipDiaryInfoStatementComponent } from '@dp/admin/diary/ui';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { normalizeRouteParam } from '@dp/shared/core';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-internship-diary-statement',
  standalone: true,
  imports: [
    CommonModule,
    InternshipDiaryInfoStatementComponent,
    TuiLoaderModule,
  ],
  templateUrl: './internship-diary-statement.component.html',
  styleUrl: './internship-diary-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatementComponent implements OnInit {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading$ = this.diaryStoreFacade.isLoading$;

  private statementId!: string;

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
