import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
} from '@angular/core';
import { ChatApiService } from '@dp/shared/chat/data-access';
import {
  ChatStoreEffects,
  ChatStoreFacade,
  chatStore,
} from '@dp/shared/chat/store';
import { ChatDialogService } from '@dp/shared/chat/ui';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TuiSheetDialogModule } from '@taiga-ui/addon-mobile';

export function provideChat(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(TuiSheetDialogModule),
    provideState(chatStore),
    provideEffects(ChatStoreEffects),
    ChatApiService,
    ChatStoreFacade,
    ChatDialogService,
  ]);
}
