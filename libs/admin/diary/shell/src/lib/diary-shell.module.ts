import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiaryApiService } from '@dp/admin/diary/data-access';
import {
  diaryStore,
  DiaryStoreEffects,
  DiaryStoreFacade,
} from '@dp/admin/diary/store';
import { provideFiles } from '@dp/shared/file/shell';
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
