import { NgModule } from '@angular/core';
import { GroupApiService } from '@dp/shared/group/data-access';
import {
  GroupStore,
  GroupStoreFacade,
  GrouptStoreEffects,
} from '@dp/shared/group/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

@NgModule({
  imports: [],
  providers: [
    provideEffects(GrouptStoreEffects),
    provideState(GroupStore),
    GroupApiService,
    GroupStoreFacade,
  ],
})
export class GroupShellModule {}
