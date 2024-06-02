import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { chatActions } from './chat-store.actions';
import { ChatStoreState } from './chat-store.interface';
import { CHAT_STORE_FEATURE_KEY } from './chat-store.key';

const initalState: ChatStoreState = {
  allMessages: [],
  loadingMessagesIds: [],
  errorMessagesIds: [],
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(chatActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(chatActions.loadAllSuccess, (state, { messages }) => ({
    ...state,
    allMessages: messages,
    status: StoreStateStatus.Loaded,
  })),

  on(chatActions.addMessage, (state, { message }) => ({
    ...state,
    loadingMessagesIds: state.loadingMessagesIds.concat(message.id),
    allMessages: state.allMessages.concat([message]),
  })),
  on(chatActions.replaceMessage, (state, { id, message }) => ({
    ...state,
    loadingMessagesIds: state.loadingMessagesIds.filter(i => i !== id),
    allMessages: state.allMessages.filter(m => m.id !== id).concat([message]),
  })),
  on(chatActions.markMessageAsFailed, (state, { id }) => ({
    ...state,
    loadingMessagesIds: state.loadingMessagesIds.filter(i => i !== id),
    errorMessagesIds: state.errorMessagesIds.concat([id]),
  })),

  on(chatActions.remove, (state, { message }) => ({
    ...state,
    allMessages: state.allMessages.filter(m => m.id !== message.id),
  })),
);

export const chatStore = createFeature({
  name: CHAT_STORE_FEATURE_KEY,
  reducer,
});
