import { EnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';

import { NotificationEffects } from './notification/notification.effects';

export function provideCommonEffects(): EnvironmentProviders {
  return provideEffects([NotificationEffects]);
}
