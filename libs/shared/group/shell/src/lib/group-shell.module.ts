import { NgModule } from '@angular/core';
import { GroupApiService } from '@dp/shared/group/data-access';
import {
  GroupStoreFacade,
  GrouptStoreEffects,
  groupStore,
} from '@dp/shared/group/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

@NgModule({
  imports: [],
  providers: [
    provideEffects(GrouptStoreEffects),
    provideState(groupStore),
    GroupApiService,
    GroupStoreFacade,
  ],
})
export class GroupShellModule {}
