import { Injectable, inject } from '@angular/core';
import { FileInfo } from '@dp/shared/file/types';
import { AttachmentEntity, StoreStateStatus } from '@dp/shared/types';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { fileActions } from './file-store.actions';
import { fromFileStore } from './file-store.selectors';

@Injectable()
export class FileStoreFacade {
  private readonly store = inject(Store);

  readonly filesInfo$ = this.store.select(
    fromFileStore.selectAllFilesInfoForEntity,
  );

  readonly loadingFilesIds$ = this.store.select(
    fromFileStore.selectLoadingFilesIds,
  );

  readonly status$ = this.store.select(fromFileStore.selectStatus);
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(entity: AttachmentEntity): void {
    this.store.dispatch(fileActions.loadAll({ entity }));
  }

  create(file: File, entity: AttachmentEntity): void {
    this.store.dispatch(fileActions.create({ file, entity }));
  }

  remove(fileInfo: FileInfo, entity: AttachmentEntity): void {
    this.store.dispatch(fileActions.remove({ fileInfo, entity }));
  }

  saveLocally(fileInfo: FileInfo): void {
    this.store.dispatch(fileActions.saveLocally({ fileInfo }));
  }
}
