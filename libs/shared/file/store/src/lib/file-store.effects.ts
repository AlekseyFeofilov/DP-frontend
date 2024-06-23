import { Injectable, inject } from '@angular/core';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { notificationActions } from '@dp/shared/effects';
import { FileApiService } from '@dp/shared/file/data-access';
import { convertFileToFileInfo } from '@dp/shared/file/types';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs';
import { FileApiAdapterHelper } from './file-api-adapter.helper';
import { fileActions } from './file-store.actions';

@Injectable()
export class FileStoreEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly fileApiService = inject(FileApiService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileActions.loadAll),
      switchMap(({ entity }) =>
        this.fileApiService
          .getAllInfoByEntity({ entityId: entity.id, entityType: entity.type })
          .pipe(
            map(response => {
              const filesInfo =
                FileApiAdapterHelper.parseAllFilesInfoForEntityApiResponse(
                  response,
                );

              return fileActions.loadAllSuccess({
                filesInfo,
              });
            }),
          ),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileActions.create),
      mergeMap(({ file, entity }) =>
        this.fileApiService
          .save(FileApiAdapterHelper.parseSaveFileApiRequest(file))
          .pipe(
            map(fileId =>
              fileActions.attach({
                fileInfo: convertFileToFileInfo(file, fileId),
                entity,
              }),
            ),
          ),
      ),
    ),
  );

  attach$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileActions.attach),
      mergeMap(({ fileInfo, entity }) =>
        this.fileApiService
          .attach(
            FileApiAdapterHelper.parseAttachFileApiRequest(fileInfo, entity),
          )
          .pipe(
            map(() =>
              fileActions.attachSuccess({
                fileInfo,
              }),
            ),
          ),
      ),
    ),
  );

  remove$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileActions.remove),
        switchMap(({ fileInfo, entity }) =>
          this.fileApiService
            .detach(
              FileApiAdapterHelper.parseDetachFileApiRequest(fileInfo, entity),
            )
            .pipe(
              catchError(() => [
                notificationActions.error({
                  label: NOTIFICATION_TEXTS.remove.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ]),
            ),
        ),
      ),
    { dispatch: false },
  );

  saveLocally$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fileActions.saveLocally),
        switchMap(({ fileInfo }) =>
          this.fileApiService.getById({ fileId: fileInfo.id }).pipe(
            tap(blob => {
              saveAs(blob, fileInfo.name);
            }),
          ),
        ),
      ),
    { dispatch: false },
  );
}
