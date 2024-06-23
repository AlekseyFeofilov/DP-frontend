import { Message, NewMessage } from '@dp/shared/chat/types';
import { AttachmentEntity } from '@dp/shared/types';
import { createAction, props } from '@ngrx/store';
import { CHAT_STORE_FEATURE_KEY } from './chat-store.key';

const loadAll = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] load all messages`,
  props<{ readonly entity: AttachmentEntity }>(),
);

const loadAllSuccess = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] load all messages success`,
  props<{ readonly messages: ReadonlyArray<Message> }>(),
);

const create = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] create a message`,
  props<{
    readonly newMessage: NewMessage;
  }>(),
);

const addMessage = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] add stub message`,
  props<{
    readonly message: Message;
  }>(),
);

const replaceMessage = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] replace stub message by real`,
  props<{
    readonly id: string;
    readonly message: Message;
  }>(),
);

const markMessageAsFailed = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] mark new message as failed to save`,
  props<{
    readonly id: string;
  }>(),
);

const requestRemove = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] request for removing a message`,
  props<{
    readonly message: Message;
  }>(),
);

const remove = createAction(
  `[${CHAT_STORE_FEATURE_KEY}] remove a message`,
  props<{
    readonly message: Message;
  }>(),
);

export const chatActions = {
  loadAll,
  loadAllSuccess,
  create,
  addMessage,
  replaceMessage,
  markMessageAsFailed,
  requestRemove,
  remove,
};
