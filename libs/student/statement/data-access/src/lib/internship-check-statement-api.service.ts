import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { InternshipCheckStatementDto } from '@dp/shared/statement/dto';
import { CreateInternshipCheckStatementDto } from '@dp/student/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipCheckStatementsApiResponse =
  Array<InternshipCheckStatementDto>;

export interface CreateInternshipCheckStatementApiRequest {
  payload: CreateInternshipCheckStatementDto;
}

@Injectable()
export class InternshipCheckStatementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/InternshipRequest`;

  getAll(): Observable<AllInternshipCheckStatementsApiResponse> {
    return this.http.get<AllInternshipCheckStatementsApiResponse>(
      `${this.baseUrl}/My`,
    );
  }

  createStatement({
    payload,
  }: CreateInternshipCheckStatementApiRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload);
  }
}
