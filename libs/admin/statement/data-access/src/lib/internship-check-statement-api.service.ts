import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import {
  InternshipCheckStatementDto,
  InternshipCheckStatementDtoStatus,
} from '@dp/shared/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipCheckStatementsApiResponse =
  Array<InternshipCheckStatementDto>;

export type ChangeInternshipCheckStatementStatusApiRequest = {
  statementId: string;
  newStatus: InternshipCheckStatementDtoStatus;
};

@Injectable()
export class InternshipCheckStatementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/InternshipRequest`;

  getAll(): Observable<AllInternshipCheckStatementsApiResponse> {
    return this.http.get<AllInternshipCheckStatementsApiResponse>(this.baseUrl);
  }

  changeStatus({
    statementId,
    newStatus,
  }: ChangeInternshipCheckStatementStatusApiRequest): Observable<void> {
    const params = new HttpParams().set('status', newStatus);

    return this.http.post<void>(`${this.baseUrl}/${statementId}/Status`, null, {
      params,
    });
  }
}
