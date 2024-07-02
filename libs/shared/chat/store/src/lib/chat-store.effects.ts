import { Injectable, inject } from '@angular/core';
import { ChatApiService } from '@dp/shared/chat/data-access';
import { Message } from '@dp/shared/chat/types';
import {
  NOTIFICATION_DESCRIPTION,
  NOTIFICATION_TEXTS,
} from '@dp/shared/consts';
import { TOKEN, parseToken } from '@dp/shared/core';
import { alertActions } from '@dp/shared/effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { catchError, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { ChatApiAdapterHelper } from './chat-api-adapter.helper';
import { chatActions } from './chat-store.actions';

@Injectable()
export class ChatStoreEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly chatApiService = inject(ChatApiService);
  private readonly dialogService = inject(TuiDialogService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.loadAll),
      switchMap(({ entity }) =>
        this.chatApiService
          .getAll(ChatApiAdapterHelper.parseGetAllMessagesApiRequest(entity))
          .pipe(
            map(response => {
              const messages =
                ChatApiAdapterHelper.parseAllMessagesApiResponse(response);

              return chatActions.loadAllSuccess({
                messages,
              });
            }),
          ),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.create),
      mergeMap(({ newMessage }) => {
        const payload = parseToken(TOKEN);
        const stubMessage: Message = {
          id: new Date().getMilliseconds().toString(),
          author: {
            id: payload.Id,
            name: payload.Name,
            email: payload.Email,
          },
          content: newMessage.content,
          createDate: TuiDay.currentLocal(),
          isMy: true,
        };

        this.store.dispatch(chatActions.addMessage({ message: stubMessage }));

        return this.chatApiService
          .create(ChatApiAdapterHelper.parseCreateMessageApiRequest(newMessage))
          .pipe(
            map(() =>
              chatActions.replaceMessage({
                id: stubMessage.id,
                message: { ...stubMessage }, // TODO: add id
              }),
            ),
            catchError(() => [
              chatActions.markMessageAsFailed({ id: stubMessage.id }),
            ]),
          );
      }),
    ),
  );

  requestRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.requestRemove),
      switchMap(({ message }) =>
        this.dialogService
          .open<boolean>(TUI_PROMPT, {
            label: 'Вы уверены?',
            size: 's',
            data: {
              content:
                'Сообщение удалится у всех участников без возможности восстановления',
            },
          })
          .pipe(
            filter(close => close),
            map(() => chatActions.remove({ message })),
          ),
      ),
    ),
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.remove),
      mergeMap(({ message }) =>
        this.chatApiService
          .delete(ChatApiAdapterHelper.parseRemoveMessageApiRequest(message.id))
          .pipe(
            map(() =>
              alertActions.success({
                message: 'Сообщение удалено',
              }),
            ),
            catchError(() =>
              of(
                alertActions.error({
                  label: NOTIFICATION_TEXTS.remove.error,
                  message: NOTIFICATION_DESCRIPTION.error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
