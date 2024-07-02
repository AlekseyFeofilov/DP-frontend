import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatDialogService } from '@dp/shared/chat/ui';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import { normalizeRouteParam } from '@dp/shared/core';
import { DiaryStoreFacade } from '@dp/student/diary/store';
import { InternshipDiaryInfoStatementComponent } from '@dp/student/diary/ui';
import { PATH_NAME } from '@dp/student/shared/consts';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'dp-internship-diary-statement',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    InternshipDiaryInfoStatementComponent,
    TuiButtonModule,
  ],
  providers: [TuiDestroyService],
  templateUrl: './internship-diary-statement.component.html',
  styleUrl: './internship-diary-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatementComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);
  private readonly chatDialogService = inject(ChatDialogService);
  private readonly destroy$ = inject(TuiDestroyService);

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

  openChat(): void {
    this.chatDialogService
      .open({
        type: ATTACHMENT_ENTITY_TYPE.InternshipDiaryStatement.key,
        id: this.statementId,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
