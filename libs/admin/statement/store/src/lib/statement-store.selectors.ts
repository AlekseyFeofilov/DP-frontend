import {
  InternshipApplyStatementStatus,
  InternshipCheckStatementStatus,
} from '@dp/shared/statement/type';
import { getStatusCapacity, isStringIncluded } from '@dp/shared/utils';
import { createSelector } from '@ngrx/store';
import { StatementStore } from './statement-store.reducer';

const {
  selectAllInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
  selectFilters,
} = StatementStore;

export const selectAllFilteredInternshipCheckStatements = createSelector(
  selectAllInternshipCheckStatements,
  selectFilters,
  (statements, filters) =>
    statements.filter(statement => {
      const {
        studentName,
        companyName,
        vacancyName,
        groupIds,
        internshipCheckStatuses,
      } = filters;
      const isMatch =
        (studentName
          ? isStringIncluded(statement.student.name, studentName)
          : true) &&
        (companyName
          ? isStringIncluded(statement.company.name, companyName)
          : true) &&
        (vacancyName
          ? isStringIncluded(statement.vacancy, vacancyName)
          : true) &&
        (statement.student.group
          ? groupIds.includes(statement.student.group.id)
          : false) &&
        internshipCheckStatuses.includes(statement.status);
      return isMatch;
    }),
);

export const selectInternshipCheckStatusesCapacity = createSelector(
  selectAllInternshipCheckStatements,
  statements =>
    getStatusCapacity(
      [...Object.values(InternshipCheckStatementStatus)],
      [...statements],
    ),
);

export const selectInternshipApplyStatusesCapacity = createSelector(
  selectAllInternshipApplyStatements,
  statements =>
    getStatusCapacity(
      [...Object.values(InternshipApplyStatementStatus)],
      [...statements],
    ),
);

export const fromStatementStore = {
  selectAllFilteredInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
  selectFilters,
  selectInternshipCheckStatusesCapacity,
  selectInternshipApplyStatusesCapacity,
};
