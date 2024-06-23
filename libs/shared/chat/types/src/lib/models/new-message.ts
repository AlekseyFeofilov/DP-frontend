import { AttachmentEntity } from '@dp/shared/types';

export interface NewMessage {
  entity: AttachmentEntity;
  content: string;
}
