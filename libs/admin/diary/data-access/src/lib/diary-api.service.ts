import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import {
  InternshipDiaryStatementDto,
  InternshipDiaryStatementDtoStatus,
} from '@dp/shared/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipDiaryStatementsApiResponse =
  Array<InternshipDiaryStatementDto>;
export type InternshipDiaryStatementByIdApiResponse =
  InternshipDiaryStatementDto;

export interface InternshipDiaryStatementByIdApiRequest {
  id: string;
}

export interface ChangInternshipeDiaryStatementStatusApiRequest {
  id: string;
  status: InternshipDiaryStatementDtoStatus;
}

export interface ChangInternshipeDiaryMarkApiRequest {
  id: string;
  mark: number;
}

@Injectable()
export class DiaryApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/InternshipDiaryRequest`;

  getAllStatements(): Observable<AllInternshipDiaryStatementsApiResponse> {
    return this.http.get<AllInternshipDiaryStatementsApiResponse>(this.baseUrl);
  }

  getStatementById({
    id,
  }: InternshipDiaryStatementByIdApiRequest): Observable<InternshipDiaryStatementByIdApiResponse> {
    return this.http.get<InternshipDiaryStatementByIdApiResponse>(
      `${this.baseUrl}/${id}`,
    );
  }

  changeStatementStatus({
    id,
    status,
  }: ChangInternshipeDiaryStatementStatusApiRequest): Observable<void> {
    const params = new HttpParams().set('newStatus', status);
    return this.http.post<void>(`${this.baseUrl}/${id}/status`, null, {
      params,
    });
  }

  changeMark({
    id,
    mark,
  }: ChangInternshipeDiaryMarkApiRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/grade/${mark}`, null);
  }
}
