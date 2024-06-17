import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { GroupDto } from '@dp/shared/student/dto';
import { Observable } from 'rxjs';

export type AllGroupsApiResponse = Array<GroupDto>;

@Injectable()
export class GroupApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Group`;

  getAll(): Observable<AllGroupsApiResponse> {
    return this.http.get<AllGroupsApiResponse>(this.baseUrl);
  }
}
