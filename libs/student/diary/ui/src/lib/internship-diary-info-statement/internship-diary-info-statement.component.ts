import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import { FilesRepositoryComponent } from '@dp/shared/file/ui';
import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import { FormValue } from '@dp/shared/types';
import { DiaryStoreFacade } from '@dp/student/diary/store';
import { NewInternshipDiaryTemplate } from '@dp/student/diary/types';
import { TuiButtonModule } from '@taiga-ui/core';
import { InternshipDiaryStatusBadgeComponent } from '../internship-diary-status-badge/internship-diary-status-badge.component';
import { InternshipDiaryTemplateFormComponent } from '../internship-diary-template-form/internship-diary-template-form.component';

@Component({
  selector: 'dp-internship-diary-info-statement',
  standalone: true,
  imports: [
    CommonModule,
    FilesRepositoryComponent,
    TuiButtonModule,
    InternshipDiaryTemplateFormComponent,
    InternshipDiaryStatusBadgeComponent,
  ],
  templateUrl: './internship-diary-info-statement.component.html',
  styleUrl: './internship-diary-info-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryInfoStatementComponent {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);

  readonly statement$ = this.diaryStoreFacade.selectedInternshipDiaryStatement$;

  // TODO: или вынести в доменную модель, или сделать пайп
  readonly ATTACHMENT_ENTITY_TYPE = ATTACHMENT_ENTITY_TYPE;
  readonly InternshipDiaryStatementStatus = InternshipDiaryStatementStatus;

  sendForReview(): void {
    console.log(1);
    this.diaryStoreFacade.changeStatus(
      InternshipDiaryStatementStatus.OnVerification,
    );
  }

  markAsSigning(): void {
    this.diaryStoreFacade.changeStatus(
      InternshipDiaryStatementStatus.SubmittedForSigning,
    );
  }

  createTemplate(
    semester: number,
    formValue: FormValue<NewInternshipDiaryTemplate>,
  ): void {
    this.diaryStoreFacade.createTemplate(semester, formValue.value);
  }
}
