import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentApiService } from '@dp/admin/student/data-access';
import {
  StudentStoreEffects,
  StudentStoreFacade,
  studentStore,
} from '@dp/admin/student/store';
import { provideFiles } from '@dp/shared/file/shell';
import { GroupShellModule } from '@dp/shared/group/shell';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { STUDENT_ROUTES } from './student.routes';

@NgModule({
  imports: [RouterModule.forChild(STUDENT_ROUTES), GroupShellModule],
  providers: [
    provideFiles(),
    provideEffects(StudentStoreEffects),
    provideState(studentStore),
    StudentApiService,
    StudentStoreFacade,
  ],
})
export class StudentShellModule {}
