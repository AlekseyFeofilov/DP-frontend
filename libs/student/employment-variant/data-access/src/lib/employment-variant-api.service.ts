import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';
import {
  CreateEmploymentVariantDto,
  EditEmploymentVariantDto,
} from '@dp/student/employment-variant/dto';
import { Observable } from 'rxjs';

export type AllEmploymentVariantsApiResponse = Array<EmploymentVariantDto>;

export type EmploymentVariantByIdApiResponse = EmploymentVariantDto;

export interface GetByIdEmploymentVariantApiRequest {
  id: string;
}

export interface CreateEmploymentVariantApiRequest {
  payload: CreateEmploymentVariantDto;
}

export interface EditEmploymentVariantApiRequest {
  id: string;
  payload: EditEmploymentVariantDto;
}

export interface DeleteEmploymentVariantApiRequest {
  id: string;
}

@Injectable()
export class EmploymentVariantApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/EmploymentVariant`;

  getAll(): Observable<AllEmploymentVariantsApiResponse> {
    return this.http.get<AllEmploymentVariantsApiResponse>(
      `${this.baseUrl}/my`,
    );
  }

  getById({
    id,
  }: GetByIdEmploymentVariantApiRequest): Observable<EmploymentVariantByIdApiResponse> {
    return this.http.get<EmploymentVariantByIdApiResponse>(
      `${this.baseUrl}/${id}`,
    );
  }

  create({ payload }: CreateEmploymentVariantApiRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  edit({ id, payload }: EditEmploymentVariantApiRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete({ id }: DeleteEmploymentVariantApiRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
