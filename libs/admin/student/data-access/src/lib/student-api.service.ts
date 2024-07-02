import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  EditEmploymentDto,
  EmploymentDto,
  StudentWithEmploymnetsDto,
} from '@dp/admin/employment/dto';
import { BASE_URL } from '@dp/shared/core';
import {
  InternshipApplyStatementDto,
  InternshipCheckStatementDto,
  InternshipDiaryStatementDto,
} from '@dp/shared/statement/dto';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { Observable, filter, map } from 'rxjs';

export type AllStudentsApiResponse = Array<StudentWithEmploymnetsDto>;

export type StudentByIdApiResponse = StudentWithEmploymnetsDto;

export type StudentEmploymentHistoryApiResponse = Array<{
  object: {
    employment?: EmploymentDto | null;
    employmentRequest?: InternshipApplyStatementDto | null;
    internshipRequest?: InternshipCheckStatementDto | null;
  };
  date: string;
}>;

export type StudentInternshipDiariesApiResponse =
  Array<InternshipDiaryStatementDto>;

export interface ChangeEmploymentStatusApiRequest {
  id: string;
  payload: EditEmploymentDto;
}

@Injectable()
export class StudentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  getAllStudents(): Observable<AllStudentsApiResponse> {
    return this.http.get<AllStudentsApiResponse>(
      `${this.baseUrl}/user/ByGroup`,
    );
  }

  // TODO: нет эндпоинта
  getStudentById(id: string): Observable<StudentByIdApiResponse> {
    return this.http
      .get<AllStudentsApiResponse>(`${this.baseUrl}/user/ByGroup`)
      .pipe(
        map(students => students.find(student => student.userId === id)),
        filter(tuiIsPresent),
      );
  }

  // TODO: разнести по доменам нормально

  getEmploymentHistory(
    studentId: string,
  ): Observable<StudentEmploymentHistoryApiResponse> {
    return this.http.get<StudentEmploymentHistoryApiResponse>(
      `${this.baseUrl}/employment/everything/${studentId}`,
    );
  }

  getInternshipDiaries(
    studentId: string,
  ): Observable<StudentInternshipDiariesApiResponse> {
    return this.http.get<StudentInternshipDiariesApiResponse>(
      `${this.baseUrl}/InternshipDiaryRequest/everything/${studentId}`,
    );
  }

  changeEmploymentStatus({
    id,
    payload,
  }: ChangeEmploymentStatusApiRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Employment/${id}`, payload);
  }
}
