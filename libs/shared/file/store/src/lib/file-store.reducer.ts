import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { FileStoreState } from './file-store-state.interface';
import { fileActions } from './file-store.actions';
import { FILE_STORE_FEATURE_KEY } from './file-store.key';

const initalState: FileStoreState = {
  allFilesInfoForEntity: [],
  loadingFilesIds: [],
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(fileActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(fileActions.loadAllSuccess, (state, { filesInfo }) => ({
    ...state,
    allFilesInfoForEntity: filesInfo,
    status: StoreStateStatus.Loaded,
  })),

  on(fileActions.attach, (state, { fileInfo }) => ({
    ...state,
    allFilesInfoForEntity: [fileInfo, ...state.allFilesInfoForEntity],
    loadingFilesIds: state.loadingFilesIds.concat([fileInfo.id]),
  })),
  on(fileActions.attachSuccess, (state, { fileInfo }) => ({
    ...state,
    loadingFilesIds: state.loadingFilesIds.filter(
      fileId => fileId !== fileInfo.id,
    ),
  })),

  on(fileActions.remove, (state, { fileInfo }) => ({
    ...state,
    allFilesInfoForEntity: state.allFilesInfoForEntity.filter(
      f => f.id != fileInfo.id,
    ),
  })),
);

export const fileStore = createFeature({
  name: FILE_STORE_FEATURE_KEY,
  reducer,
});
