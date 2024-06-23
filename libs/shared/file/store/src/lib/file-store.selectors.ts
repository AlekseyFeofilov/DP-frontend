import { fileStore } from './file-store.reducer';

const { selectAllFilesInfoForEntity, selectLoadingFilesIds, selectStatus } =
  fileStore;

export const fromFileStore = {
  selectAllFilesInfoForEntity,
  selectLoadingFilesIds,
  selectStatus,
};
