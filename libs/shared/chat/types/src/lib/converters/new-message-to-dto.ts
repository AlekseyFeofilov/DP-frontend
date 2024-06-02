import { CreateMessageDto } from '@dp/shared/chat/dto';
import { NewMessage } from '../models/new-message';

export function convertNewMessageToDto(
  newMessage: NewMessage,
): CreateMessageDto {
  return {
    entityId: newMessage.entityId,
    message: newMessage.content,
  };
}
