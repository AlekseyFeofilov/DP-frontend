import { Message } from '@dp/shared/chat/types';
import { StoreStateStatus } from '@dp/shared/types';

export interface ChatStoreState {
  readonly allMessages: ReadonlyArray<Message>;
  readonly loadingMessagesIds: ReadonlyArray<string>;
  readonly errorMessagesIds: ReadonlyArray<string>;
  readonly status: StoreStateStatus;
}
