import { Injectable, inject } from '@angular/core';
import { Message, NewMessage } from '@dp/shared/chat/types';
import { AttachmentEntity, StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { chatActions } from './chat-store.actions';
import { fromChatStore } from './chat-store.selectors';

@Injectable()
export class ChatStoreFacade {
  private readonly store = inject(Store);

  readonly messages$ = this.store.pipe(select(fromChatStore.selectAllMessages));
  readonly loadingMessagesIds$ = this.store.pipe(
    select(fromChatStore.selectLoadingMessagesIds),
  );
  readonly errorMessagesIds$ = this.store.pipe(
    select(fromChatStore.selectErrorMessagesIds),
  );

  readonly status$ = this.store.pipe(select(fromChatStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(entity: AttachmentEntity): void {
    this.store.dispatch(chatActions.loadAll({ entity }));
  }

  create(newMessage: NewMessage): void {
    this.store.dispatch(chatActions.create({ newMessage }));
  }

  remove(message: Message): void {
    this.store.dispatch(chatActions.requestRemove({ message }));
  }
}
