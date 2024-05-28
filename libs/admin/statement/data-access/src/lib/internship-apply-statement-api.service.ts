import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import {
  InternshipApplyStatementDto,
  InternshipApplyStatementDtoStatus,
} from '@dp/shared/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipApplyStatementsApiResponse =
  Array<InternshipApplyStatementDto>;

export type ChangeInternshipApplyStatementStatusApiRequest = {
  statementId: string;
  newStatus: InternshipApplyStatementDtoStatus;
};

@Injectable()
export class InternshipApplyStatementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/EmploymentRequest`;

  getAll(): Observable<AllInternshipApplyStatementsApiResponse> {
    return this.http.get<AllInternshipApplyStatementsApiResponse>(this.baseUrl);
  }

  changeStatus({
    statementId,
    newStatus,
  }: ChangeInternshipApplyStatementStatusApiRequest): Observable<void> {
    const params = new HttpParams().set('status', newStatus);

    return this.http.put<void>(`${this.baseUrl}/${statementId}/Status`, null, {
      params,
    });
  }
}
