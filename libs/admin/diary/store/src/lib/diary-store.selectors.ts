import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import { getStatusCapacity } from '@dp/shared/utils';
import { createSelector } from '@ngrx/store';
import { diaryStore } from './diary-store.reducer';

const {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectSelectedInternshipDiaryStatementNewStatus,
  selectSelectedInternshipDiaryStatementNewMark,
  selectStatus,
} = diaryStore;

export const selectInternshipDiaryStatementStatusesCapacity = createSelector(
  selectAllInternshipDiaryStatements,
  internshipDiaryStatements =>
    getStatusCapacity(
      [...Object.values(InternshipDiaryStatementStatus)],
      [...internshipDiaryStatements],
    ),
);

export const fromDiaryStore = {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectSelectedInternshipDiaryStatementNewStatus,
  selectSelectedInternshipDiaryStatementNewMark,
  selectInternshipDiaryStatementStatusesCapacity,
  selectStatus,
};
