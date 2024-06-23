import { FileInfo } from '@dp/shared/file/types';
import { AttachmentEntity } from '@dp/shared/types';
import { createAction, props } from '@ngrx/store';
import { FILE_STORE_FEATURE_KEY } from './file-store.key';

const loadAll = createAction(
  `[${FILE_STORE_FEATURE_KEY}] load all files info for entity`,
  props<{
    readonly entity: AttachmentEntity;
  }>(),
);

const loadAllSuccess = createAction(
  `[${FILE_STORE_FEATURE_KEY}] load all files info for entity success`,
  props<{
    readonly filesInfo: ReadonlyArray<FileInfo>;
  }>(),
);

/**
 * Сначала создается файл, а потом сразу прикрепляется к сущности
 */

const create = createAction(
  `[${FILE_STORE_FEATURE_KEY}] create a file in the system`,
  props<{
    readonly file: File;
    readonly entity: AttachmentEntity;
  }>(),
);

const attach = createAction(
  `[${FILE_STORE_FEATURE_KEY}] attach file info to entity`,
  props<{
    readonly fileInfo: FileInfo;
    readonly entity: AttachmentEntity;
  }>(),
);

const attachSuccess = createAction(
  `[${FILE_STORE_FEATURE_KEY}] attach file info to entity success`,
  props<{
    readonly fileInfo: FileInfo;
  }>(),
);

const remove = createAction(
  `[${FILE_STORE_FEATURE_KEY}] remove file info`,
  props<{
    readonly fileInfo: FileInfo;
    readonly entity: AttachmentEntity;
  }>(),
);

const saveLocally = createAction(
  `[${FILE_STORE_FEATURE_KEY}] save file locally`,
  props<{
    readonly fileInfo: FileInfo;
  }>(),
);

export const fileActions = {
  loadAll,
  loadAllSuccess,
  create,
  attach,
  attachSuccess,
  remove,
  saveLocally,
};
