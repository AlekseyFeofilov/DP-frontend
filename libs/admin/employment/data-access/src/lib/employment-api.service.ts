import { StudentWithEmploymnetsDto } from '@dp/admin/employment/dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '@dp/shared/core';
import { Observable } from 'rxjs';

export type DashboardApiResponse = {
  students: ReadonlyArray<StudentWithEmploymnetsDto>;
};

@Injectable()
export class EmploymentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(BASE_URL)}`;

  getDashboardInfo(): Observable<DashboardApiResponse> {
    const params = new HttpParams().set('page', 1);

    return this.http.get<DashboardApiResponse>(
      `${this.baseUrl}/User/Dashboard`,
      { params },
    );
  }
}
