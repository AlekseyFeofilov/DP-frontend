import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

export interface GetFileApiRequest {
  fileId: string;
}

export interface SaveFileApiRequest {
  payload: File;
}

export interface AttachFileApiRequest {
  fileId: string;
  entityType: string;
  entityId: string;
}

@Injectable()
export class FileApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/File`;

  getById({ fileId }: GetFileApiRequest): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${fileId}`, {
      responseType: 'blob',
    });
  }

  save({ payload }: SaveFileApiRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload);
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
}
