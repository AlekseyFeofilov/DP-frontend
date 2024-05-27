import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { InternshipApplyStatementDto } from '@dp/shared/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipApplyStatementsApiResponse =
  Array<InternshipApplyStatementDto>;

export interface CreateInternshipApplyStatementApiRequest {
  internshipCheckStatementId: string;
}

@Injectable()
export class InternshipApplyStatementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/EmploymentRequest`;

  getAll(): Observable<AllInternshipApplyStatementsApiResponse> {
    return this.http.get<AllInternshipApplyStatementsApiResponse>(
      `${this.baseUrl}/My`,
    );
  }

  createStatement({
    internshipCheckStatementId,
  }: CreateInternshipApplyStatementApiRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${internshipCheckStatementId}`,
      null,
    );
  }
}
