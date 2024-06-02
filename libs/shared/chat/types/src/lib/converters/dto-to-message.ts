import { MessageDto } from '@dp/shared/chat/dto';
import { TOKEN, parseToken } from '@dp/shared/core';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { Message } from '../models/message';

export function convertDtoToMessage(dto: MessageDto): Message {
  return {
    id: dto.id,
    author: {
      id: dto.author.id,
      name: dto.author.name,
      email: dto.author.email,
    },
    content: dto.message,
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createDateTime)),
    isMy: parseToken(TOKEN).Id === dto.author.id,
  };
}
