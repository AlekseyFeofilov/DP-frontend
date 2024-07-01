import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NotificationApiService } from '@dp/shared/notification/data-access';
import {
  NotificationStoreEffects,
  NotificationStoreFacade,
  notificationStore,
} from '@dp/shared/notification/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export function provideNotifications(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(notificationStore),
    provideEffects(NotificationStoreEffects),
    NotificationApiService,
    NotificationStoreFacade,
  ]);
}
