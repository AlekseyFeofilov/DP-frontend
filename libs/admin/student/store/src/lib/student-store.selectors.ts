import { EmploymentStatus } from '@dp/admin/employment/types';
import { isStringIncluded } from '@dp/shared/utils';
import { createSelector } from '@ngrx/store';
import { studentStore } from './student-store.reducer';

const { selectAllStudents, selectFilters, selectProfile, selectStatus } =
  studentStore;

export const selectFilteredStudents = createSelector(
  selectAllStudents,
  selectFilters,
  (students, filters) =>
    students.filter(student => {
      const { studentName, groupIds } = filters;
      const isMatch =
        (studentName ? isStringIncluded(student.name, studentName) : true) &&
        (student.group ? groupIds.includes(student.group.id) : false);

      return isMatch;
    }),
);

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
  selectFilteredStudents,
  selectProfile,
  selectSelectedStudentInfo,
  selectEmploymentHistory,
  selectIntenrshipDiaries,
  selectStatus,
  selectFilters,
};
