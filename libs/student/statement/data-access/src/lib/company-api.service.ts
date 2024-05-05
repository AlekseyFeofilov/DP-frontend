import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyDto } from '@dp/admin/company/dto';
import { BASE_URL } from '@dp/shared/core';
import { Observable, map } from 'rxjs';

export type AllCompaniesApiResponse = ReadonlyArray<CompanyDto>; // TODO: убрать зависимость

@Injectable()
export class CompanyApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}/Employer`;

  getAllPartners(): Observable<AllCompaniesApiResponse> {
    return this.http
      .get<AllCompaniesApiResponse>(`${this.baseUrl}/GetAll`)
      .pipe(map(companies => companies.filter(company => company.isPartner)));
  }
}
