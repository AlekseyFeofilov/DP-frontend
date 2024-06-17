import { InternshipCheckStatement } from '@dp/shared/statement/type';
import { isStringIncluded } from '@dp/shared/utils';
import { createSelector } from '@ngrx/store';
import { StatemntFilters } from './statement-store-state.interface';
import { StatementStore } from './statement-store.reducer';

const {
  selectAllInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
  selectFilters,
  selectGroups,
} = StatementStore;

export const selectAllFilteredInternshipCheckStatements = createSelector(
  selectAllInternshipCheckStatements,
  selectFilters,
  (
    statements: ReadonlyArray<InternshipCheckStatement>,
    filters: StatemntFilters,
  ) =>
    statements.filter(statement => {
      const { studentName, companyName, vacancyName, groupIds } = filters;
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
          : false);
      return isMatch;
    }),
);

export const fromStatementStore = {
  selectAllFilteredInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
  selectGroups,
};
