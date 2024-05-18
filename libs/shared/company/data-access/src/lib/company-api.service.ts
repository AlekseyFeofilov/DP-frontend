import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyDto } from '@dp/shared/company/dto';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

export type AllCompaniesApiResponse = Array<CompanyDto>;

export type CompanyByIdApiResponse = CompanyDto;

@Injectable()
export class CompanyCommonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Employer`;

  getAll(): Observable<AllCompaniesApiResponse> {
    return this.http.get<AllCompaniesApiResponse>(`${this.baseUrl}/GetAll`);
  }

  getById(id: string): Observable<CompanyByIdApiResponse> {
    return this.http.get<CompanyByIdApiResponse>(`${this.baseUrl}/${id}`);
  }
}
