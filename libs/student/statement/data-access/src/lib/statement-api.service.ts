import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { CreateInternshipStatementDto } from '@dp/student/statement/dto';
import { Observable } from 'rxjs';

export interface CreateInternshipStatementApiRequest {
  payload: CreateInternshipStatementDto;
}

@Injectable()
export class StatementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Employment`;

  createInternship({
    payload,
  }: CreateInternshipStatementApiRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/InternshipRequest`, payload);
  }
}
