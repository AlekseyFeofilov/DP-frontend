import {
  EmploymentChain,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { InternshipDiaryStatement } from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';

export interface StudentStoreState {
  readonly allStudents: ReadonlyArray<StudentWithEmployments>;
  readonly profile: {
    readonly selectedStudent: StudentWithEmployments | null;
    readonly employmentHistory: ReadonlyArray<EmploymentChain>;
    readonly internshipDiaries: ReadonlyArray<InternshipDiaryStatement>;
  };
  readonly status: StoreStateStatus;
}
