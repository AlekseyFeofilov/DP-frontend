import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateMessageDto, MessageDto } from '@dp/shared/chat/dto';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

export type AllMessagesApiResponse = Array<MessageDto>;

export interface GetAllMessagesApiRequest {
  entityType: string;
  entityId: string;
}

export interface CreateMessageApiRequest {
  payload: CreateMessageDto;
}

export interface CreateMessageApiResponse {
  id: string;
}

export interface DeleteMessageApiRequest {
  id: string;
}

@Injectable()
export class ChatApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Comment`;

  getAll({
    entityType,
    entityId,
  }: GetAllMessagesApiRequest): Observable<AllMessagesApiResponse> {
    return this.http.get<AllMessagesApiResponse>(
      `${this.baseUrl}/${entityType}/${entityId}`,
    );
  }

  create({
    payload,
  }: CreateMessageApiRequest): Observable<CreateMessageApiResponse> {
    return this.http.post<CreateMessageApiResponse>(this.baseUrl, payload);
  }

  delete({ id }: DeleteMessageApiRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
