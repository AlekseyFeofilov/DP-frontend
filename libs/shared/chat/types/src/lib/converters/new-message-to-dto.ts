import { CreateMessageDto } from '@dp/shared/chat/dto';
import { NewMessage } from '../models/new-message';

export function convertNewMessageToDto(
  newMessage: NewMessage,
): CreateMessageDto {
  return {
    entityType: newMessage.entity.type,
    entityId: newMessage.entity.id,
    message: newMessage.content,
  };
}
