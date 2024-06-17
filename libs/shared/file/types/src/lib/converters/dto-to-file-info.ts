import { FileInfoDto } from '@dp/shared/file/dto';
import { normalizeDateTime } from '@dp/shared/utils';
import { TuiDay } from '@taiga-ui/cdk';
import { FileInfo } from '../models/file-info';

export function convertDtoToFileInfo(dto: FileInfoDto): FileInfo {
  return {
    id: dto.fileId,
    name: dto.fileName,
    contentType: dto.contentType,
    size: dto.size,
    createDate: TuiDay.jsonParse(normalizeDateTime(dto.createdAt)),
  };
}
