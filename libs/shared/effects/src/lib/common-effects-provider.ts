import { EnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { AlertEffects } from './alert/alert.effects';

export function provideCommonEffects(): EnvironmentProviders {
  return provideEffects([AlertEffects]);
}
