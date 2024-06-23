import {
  AllFilesInfoForEntityApiResponse,
  AttachFileApiRequest,
  DetachFileApiRequest,
  SaveFileApiRequest,
} from '@dp/shared/file/data-access';
import {
  FileInfo,
  convertDtoToFileInfo,
  convertFileToDto,
} from '@dp/shared/file/types';
import { AttachmentEntity } from '@dp/shared/types';

export namespace FileApiAdapterHelper {
  export function parseAllFilesInfoForEntityApiResponse(
    apiResponse: AllFilesInfoForEntityApiResponse,
  ): FileInfo[] {
    return apiResponse.map(convertDtoToFileInfo);
  }

  export function parseSaveFileApiRequest(file: File): SaveFileApiRequest {
    return { payload: convertFileToDto(file) };
  }

  export function parseAttachFileApiRequest(
    fileInfo: FileInfo,
    entity: AttachmentEntity,
  ): AttachFileApiRequest {
    return {
      fileId: fileInfo.id,
      entityType: entity.type,
      entityId: entity.id,
    };
  }

  export function parseDetachFileApiRequest(
    fileInfo: FileInfo,
    entity: AttachmentEntity,
  ): DetachFileApiRequest {
    return {
      fileId: fileInfo.id,
      entityType: entity.type,
      entityId: entity.id,
    };
  }
}
