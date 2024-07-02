import {
  EmploymentChain,
  StudentWithEmployments,
} from '@dp/admin/employment/types';
import { InternshipDiaryStatement } from '@dp/shared/statement/type';
import { createAction, props } from '@ngrx/store';
import { STUDENT_STORE_FEATURE_KEY } from './student-store.key';

const loadAll = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load all students`,
);

const loadAllSuccess = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load all students success`,
  props<{
    readonly students: ReadonlyArray<StudentWithEmployments>;
  }>(),
);

const loadSelected = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load selected student`,
  props<{ readonly id: string }>(),
);

const loadSelectedSuccess = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load selected student success`,
  props<{ readonly student: StudentWithEmployments }>(),
);

const loadEmploymentHistory = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load employment history`,
  props<{ readonly studentId: string }>(),
);

const loadEmploymentHistorySuccess = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load employment histor success`,
  props<{ readonly employmentHistory: ReadonlyArray<EmploymentChain> }>(),
);

const loadInternhsipDiaries = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load internship diaries`,
  props<{ readonly studentId: string }>(),
);

const loadInternhsipDiariesSuccess = createAction(
  `[${STUDENT_STORE_FEATURE_KEY}] load internship diaries success`,
  props<{
    readonly internshipDiaries: ReadonlyArray<InternshipDiaryStatement>;
  }>(),
);

export const studentActions = {
  loadAll,
  loadAllSuccess,
  loadSelected,
  loadSelectedSuccess,
  loadEmploymentHistory,
  loadEmploymentHistorySuccess,
  loadInternhsipDiaries,
  loadInternhsipDiariesSuccess,
};
