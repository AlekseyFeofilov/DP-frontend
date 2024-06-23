import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatDialogService } from '@dp/shared/chat/ui';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import { InternshipDiaryStatement } from '@dp/shared/statement/type';
import { DiaryStoreFacade } from '@dp/student/diary/store';
import {
  TuiDestroyService,
  TuiLetModule,
  TuiMapperPipeModule,
} from '@taiga-ui/cdk';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { takeUntil } from 'rxjs';
import { InternshipDiaryStatusBadgeComponent } from '../internship-diary-status-badge/internship-diary-status-badge.component';

@Component({
  selector: 'dp-internship-diary-statement-managment',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiLinkModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiMapperPipeModule,
    TuiLetModule,
    InternshipDiaryStatusBadgeComponent,
  ],
  providers: [TuiDestroyService],
  templateUrl: './internship-diary-statement-managment.component.html',
  styleUrl: './internship-diary-statement-managment.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatementManagmentComponent {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);
  private readonly chatDialogService = inject(ChatDialogService);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly statements$ = this.diaryStoreFacade.internshipDiaryStatements$;

  readonly semesters = [5, 6, 7, 8] as const;

  getStatementForSemester(
    statements: ReadonlyArray<InternshipDiaryStatement>,
    semester: number,
  ): InternshipDiaryStatement | null {
    return (
      statements.find(statement => statement.semester === semester) ?? null
    );
  }

  openChat(statement: InternshipDiaryStatement): void {
    this.chatDialogService
      .open({
        type: ATTACHMENT_ENTITY_TYPE.InternshipDiaryStatement.key,
        id: statement.id,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  create(semester: number): void {
    this.diaryStoreFacade.create({ semester });
  }

  delete(internshipDiaryStatement: InternshipDiaryStatement): void {
    this.diaryStoreFacade.remove(internshipDiaryStatement);
  }
}
