import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import {
  InternshipDiaryStatementDto,
  InternshipDiaryStatementDtoStatus,
} from '@dp/shared/statement/dto';
import { CreateInternshipDiaryTemplateDto } from '@dp/student/diary/dto';
import { CreateInternshipDiaryStatementDto } from '@dp/student/statement/dto';
import { Observable } from 'rxjs';

export type AllInternshipDiaryStatementsApiResponse =
  Array<InternshipDiaryStatementDto>;

export type InternshipDiaryStatementByIdApiResponse =
  InternshipDiaryStatementDto;

export interface InternshipDiaryStatementByIdApiRequest {
  id: string;
}

export interface ChangeInternshipDiaryStatementStatusApiRequest {
  id: string;
  status: InternshipDiaryStatementDtoStatus;
}

export interface CreateInternshipDiaryStatementApiRequest {
  payload: CreateInternshipDiaryStatementDto;
}

export interface DeleteInternshipDiaryStatementStatusApiRequest {
  id: string;
}

export interface CreateInternshipDiaryTempalteApiRequest {
  payload: CreateInternshipDiaryTemplateDto;
  semester: number;
}

@Injectable()
export class DiaryApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  getAllStatements(): Observable<AllInternshipDiaryStatementsApiResponse> {
    return this.http.get<AllInternshipDiaryStatementsApiResponse>(
      `${this.baseUrl}/InternshipDiaryRequest/my`,
    );
  }

  getStatementById({
    id,
  }: InternshipDiaryStatementByIdApiRequest): Observable<InternshipDiaryStatementByIdApiResponse> {
    return this.http.get<InternshipDiaryStatementByIdApiResponse>(
      `${this.baseUrl}/InternshipDiaryRequest/${id}`,
    );
  }

  changeStatementStatus({
    id,
    status,
  }: ChangeInternshipDiaryStatementStatusApiRequest): Observable<void> {
    const params = new HttpParams().set('newStatus', status);
    return this.http.post<void>(
      `${this.baseUrl}/InternshipDiaryRequest/${id}/status`,
      null,
      {
        params,
      },
    );
  }

  createStatement({
    payload,
  }: CreateInternshipDiaryStatementApiRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/InternshipDiaryRequest`,
      payload,
    );
  }

  deleteStatement({
    id,
  }: DeleteInternshipDiaryStatementStatusApiRequest): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/InternshipDiaryRequest/${id}`,
    );
  }

  createTemplate({
    semester,
    payload,
  }: CreateInternshipDiaryTempalteApiRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/DocumentTemplate/InternshipDiary/semester/${semester}/generate`,
      payload,
    );
  }
}
