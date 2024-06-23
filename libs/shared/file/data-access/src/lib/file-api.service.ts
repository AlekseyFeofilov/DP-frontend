import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { FileInfoDto } from '@dp/shared/file/dto';
import { Observable, map } from 'rxjs';

export interface GetAllFilesInfoApiRequest {
  entityType: string;
  entityId: string;
}

export interface GetFileApiRequest {
  fileId: string;
}

export interface SaveFileApiRequest {
  payload: FormData;
}

export interface AttachFileApiRequest {
  fileId: string;
  entityType: string;
  entityId: string;
}

export type DetachFileApiRequest = AttachFileApiRequest;

export type AllFilesInfoForEntityApiResponse = Array<FileInfoDto>;

@Injectable()
export class FileApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/File`;

  getById({ fileId }: GetFileApiRequest): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${fileId}`, {
      responseType: 'blob',
    });
  }

  getAllInfoByEntity({
    entityId,
    entityType,
  }: GetAllFilesInfoApiRequest): Observable<AllFilesInfoForEntityApiResponse> {
    return this.http
      .get<{
        files: AllFilesInfoForEntityApiResponse;
      }>(`${this.baseUrl}/${entityType}/${entityId}`)
      .pipe(map(response => response.files));
  }

  save({ payload }: SaveFileApiRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl, payload);
  }

  attach({
    fileId,
    entityId,
    entityType,
  }: AttachFileApiRequest): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${fileId}/link/${entityType}/${entityId}`,
      null,
    );
  }

  detach({
    fileId,
    entityId,
    entityType,
  }: AttachFileApiRequest): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${fileId}/link/${entityType}/${entityId}`,
    );
  }
}
