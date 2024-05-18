import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateCompanyDto, EditCompanyDto } from '@dp/admin/company/dto';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

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
