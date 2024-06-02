import {
  AllMessagesApiResponse,
  CreateMessageApiRequest,
  DeleteMessageApiRequest,
  GetAllMessagesApiRequest,
} from '@dp/shared/chat/data-access';
import {
  Message,
  NewMessage,
  convertDtoToMessage,
  convertNewMessageToDto,
} from '@dp/shared/chat/types';

export namespace ChatApiAdapterHelper {
  export function parseGetAllMessagesApiRequest(
    entityId: string,
  ): GetAllMessagesApiRequest {
    return { entityId };
  }

  export function parseAllMessagesApiResponse(
    apiResponse: AllMessagesApiResponse,
  ): Message[] {
    return apiResponse.map(dto => convertDtoToMessage(dto));
  }

  export function parseCreateMessageApiRequest(
    newMessage: NewMessage,
  ): CreateMessageApiRequest {
    return {
      payload: convertNewMessageToDto(newMessage),
    };
  }

  export function parseRemoveMessageApiRequest(
    id: string,
  ): DeleteMessageApiRequest {
    return {
      id,
    };
  }
}
