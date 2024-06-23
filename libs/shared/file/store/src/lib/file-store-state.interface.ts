import { FileInfo } from '@dp/shared/file/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface FileStoreState {
  readonly allFilesInfoForEntity: ReadonlyArray<FileInfo>;
  readonly loadingFilesIds: ReadonlyArray<string>;
  readonly status: StoreStateStatus;
}
