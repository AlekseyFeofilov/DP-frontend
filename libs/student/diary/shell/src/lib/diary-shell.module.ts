import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideFiles } from '@dp/shared/file/shell';
import { DiaryApiService } from '@dp/student/diary/data-access';
import {
  DiaryStoreEffects,
  DiaryStoreFacade,
  diaryStore,
} from '@dp/student/diary/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DIARY_ROUTES } from './diary.routes';

@NgModule({
  imports: [RouterModule.forChild(DIARY_ROUTES)],
  providers: [
    provideFiles(),
    provideEffects(DiaryStoreEffects),
    provideState(diaryStore),
    DiaryApiService,
    DiaryStoreFacade,
  ],
})
export class DiaryShellModule {}
