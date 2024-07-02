import { EmploymentStatus } from '@dp/admin/employment/types';
import { createSelector } from '@ngrx/store';
import { studentStore } from './student-store.reducer';

const { selectAllStudents, selectProfile, selectStatus } = studentStore;

export const selectSelectedStudentInfo = createSelector(
  selectProfile,
  profile => profile.selectedStudent,
);

export const selectEmploymentHistory = createSelector(selectProfile, profile =>
  profile.employmentHistory
    .filter(item => !!item.employment)
    .sort((i1, i2) =>
      i1.date.dayBefore(i2.date)
        ? 1
        : i1.date.daySame(i2.date)
          ? i1.employment?.status === EmploymentStatus.Active
            ? 1
            : 0
          : -1,
    ),
);

export const selectIntenrshipDiaries = createSelector(selectProfile, profile =>
  [...profile.internshipDiaries].sort((d1, d2) => d1.semester - d2.semester),
);

export const fromStudentStore = {
  selectAllStudents,
  selectProfile,
  selectSelectedStudentInfo,
  selectEmploymentHistory,
  selectIntenrshipDiaries,
  selectStatus,
};
