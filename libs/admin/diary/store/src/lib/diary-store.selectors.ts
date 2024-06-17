import { diaryStore } from './diary-store.reducer';

const {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectSelectedInternshipDiaryStatementNewStatus,
  selectSelectedInternshipDiaryStatementNewMark,
  selectStatus,
} = diaryStore;

export const fromDiaryStore = {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectSelectedInternshipDiaryStatementNewStatus,
  selectSelectedInternshipDiaryStatementNewMark,
  selectStatus,
};
