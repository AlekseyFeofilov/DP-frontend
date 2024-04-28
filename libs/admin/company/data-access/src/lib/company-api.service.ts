import {
  CreateCompanyDto,
  EditCompanyDto,
  CompanyDto,
} from '@dp/admin/company/dto';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

export type AllCompaniesApiResponse = ReadonlyArray<CompanyDto>;

export type CompanyByIdApiResponse = CompanyDto;

export interface CreateCompanyApiRequest {
  payload: CreateCompanyDto;
}

export interface EditCompanyApiRequest {
  id: string;
  payload: EditCompanyDto;
}

export interface DeleteCompanyApiRequest {
  id: string;
}

@Injectable()
export class CompanyApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Employer`;

  getAll(): Observable<AllCompaniesApiResponse> {
    return this.http.get<AllCompaniesApiResponse>(`${this.baseUrl}/GetAll`);
  }

  getById(id: string): Observable<CompanyByIdApiResponse> {
    return this.http.get<CompanyByIdApiResponse>(`${this.baseUrl}/${id}`);
  }

  create({ payload }: CreateCompanyApiRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  edit({ id, payload }: EditCompanyApiRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete({ id }: DeleteCompanyApiRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
