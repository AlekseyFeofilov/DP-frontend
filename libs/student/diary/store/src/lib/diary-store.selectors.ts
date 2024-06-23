import { diaryStore } from './diary-store.reducer';

const {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectStatus,
} = diaryStore;

export const fromDiaryStore = {
  selectAllInternshipDiaryStatements,
  selectSelectedInternshipDiaryStatement,
  selectStatus,
};
