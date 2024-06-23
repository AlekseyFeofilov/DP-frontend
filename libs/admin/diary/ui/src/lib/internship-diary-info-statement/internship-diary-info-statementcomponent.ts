import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DiaryStoreFacade } from '@dp/admin/diary/store';
import { ATTACHMENT_ENTITY_TYPE } from '@dp/shared/consts';
import { FilesRepositoryComponent } from '@dp/shared/file/ui';
import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import {
  TuiDestroyService,
  TuiItemModule,
  TuiMapperPipeModule,
  tuiIsPresent,
} from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TuiDataListWrapperModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'dp-internship-diary-info-statement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiMapperPipeModule,
    TuiItemModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
    FilesRepositoryComponent,
  ],
  providers: [TuiDestroyService],
  templateUrl: './internship-diary-info-statement.component.html',
  styleUrl: './internship-diary-info-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryInfoStatementComponent implements OnInit {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly statement$ =
    this.diaryStoreFacade.selectedInternshipDiaryStatement$.pipe(
      tap(statement => {
        if (statement) {
          this.statusControl.setValue(statement.status, { emitEvent: false });
          this.markControl.setValue(statement.mark, { emitEvent: false });
        }
      }),
    );

  readonly disableSaveButton$ = this.diaryStoreFacade.isFieldsDirty$.pipe(
    map(isDirty => !isDirty),
  );

  // TODO: disable item handler (уточнить, если нельзя переходить из одного статуса в другой)
  readonly statuses = Object.values(InternshipDiaryStatementStatus).slice(3);
  readonly ATTACHMENT_ENTITY_TYPE = ATTACHMENT_ENTITY_TYPE;

  readonly statusControl = new FormControl<InternshipDiaryStatementStatus>(
    InternshipDiaryStatementStatus.No,
    { nonNullable: true },
  );

  readonly markControl = new FormControl<number | null>(null);

  ngOnInit(): void {
    this.trackStatusChanges();
    this.trackMarkChanges();
  }

  saveChanges(): void {
    this.diaryStoreFacade.saveChanges();
  }

  private trackStatusChanges(): void {
    this.statusControl.valueChanges
      .pipe(
        tap(status => this.diaryStoreFacade.changeStatus(status)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private trackMarkChanges(): void {
    this.markControl.valueChanges
      .pipe(
        filter(tuiIsPresent),
        tap(mark => this.diaryStoreFacade.changeMark(mark)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
