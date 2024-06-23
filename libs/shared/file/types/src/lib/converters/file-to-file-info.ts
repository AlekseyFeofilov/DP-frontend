import { TuiDay } from '@taiga-ui/cdk';
import { FileInfo } from '../models';

export function convertFileToFileInfo(file: File, fileId: string): FileInfo {
  return {
    id: fileId,
    name: file.name,
    contentType: file.type,
    size: file.size,
    createDate: TuiDay.currentLocal(),
  };
}
