import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DiaryStoreFacade } from '@dp/admin/diary/store';
import { FileApiService } from '@dp/shared/file/data-access';
import { FileInfo } from '@dp/shared/file/types';
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
  TuiFileLike,
  TuiFileState,
  TuiInputFilesModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { saveAs } from 'file-saver';
import { BehaviorSubject, filter, finalize, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'dp-internship-diary-info-statement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiMapperPipeModule,
    TuiInputFilesModule,
    TuiItemModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
  ],
  providers: [FileApiService, TuiDestroyService],
  templateUrl: './internship-diary-info-statement.component.html',
  styleUrl: './internship-diary-info-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryInfoStatementComponent implements OnInit {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);
  private readonly fileApiService = inject(FileApiService);
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
  readonly statuses = Object.values(InternshipDiaryStatementStatus).slice(2);

  readonly url$ = new BehaviorSubject<string>('');
  readonly fileState$ = new BehaviorSubject<TuiFileState>('normal');

  readonly statusControl = new FormControl<InternshipDiaryStatementStatus>(
    InternshipDiaryStatementStatus.No,
    { nonNullable: true },
  );

  readonly markControl = new FormControl<number | null>(null);

  ngOnInit(): void {
    this.trackStatusChanges();
    this.trackMarkChanges();
  }

  sortFiles(files: FileInfo[]): FileInfo[] {
    return files
      .slice()
      .sort((f1, f2) => (f1.createDate.dayAfter(f2.createDate) ? 1 : -1));
  }

  parseFile(file: FileInfo): TuiFileLike {
    return {
      content: file.createDate,
      name: file.name,
      size: file.size,
      type: file.contentType,
    };
  }

  saveChanges(): void {
    this.diaryStoreFacade.saveChanges();
  }

  // TODO: вынести в стор
  saveFile(file: FileInfo) {
    this.fileApiService
      .getById({ fileId: file.id })
      .pipe(
        tap(() => {
          return this.fileState$.next('loading');
        }),
        finalize(() => this.fileState$.next('normal')),
        takeUntil(this.destroy$),
      )
      .subscribe(blob => {
        saveAs(blob, file.name);
      });
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
