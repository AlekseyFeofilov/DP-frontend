import { chatStore } from './chat-store.reducer';

const {
  selectAllMessages,
  selectLoadingMessagesIds,
  selectErrorMessagesIds,
  selectStatus,
} = chatStore;

export const fromChatStore = {
  selectAllMessages,
  selectLoadingMessagesIds,
  selectErrorMessagesIds,
  selectStatus,
};
