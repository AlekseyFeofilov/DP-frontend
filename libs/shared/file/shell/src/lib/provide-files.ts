import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FileApiService } from '@dp/shared/file/data-access';
import {
  FileStoreEffects,
  FileStoreFacade,
  fileStore,
} from '@dp/shared/file/store';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export function provideFiles(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(fileStore),
    provideEffects(FileStoreEffects),
    FileApiService,
    FileStoreFacade,
  ]);
}
