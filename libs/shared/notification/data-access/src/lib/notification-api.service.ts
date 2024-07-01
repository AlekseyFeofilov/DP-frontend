import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { NotificationDto } from '@dp/shared/notification/dto';
import { Observable } from 'rxjs';

export type AllNotificationsApiResponse = Array<NotificationDto>;

export interface DeleteNotificationApiRequest {
  id: string;
}

@Injectable()
export class NotificationApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Notification`;

  getAll(): Observable<AllNotificationsApiResponse> {
    return this.http.get<AllNotificationsApiResponse>(`${this.baseUrl}/my`);
  }

  getUnreadQuntity(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/my/unread`);
  }

  delete({ id }: DeleteNotificationApiRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
