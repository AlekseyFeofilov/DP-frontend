import { StatementStore } from './statement-store.reducer';

const {
  selectAllInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
} = StatementStore;

export const fromStatementStore = {
  selectAllInternshipCheckStatements,
  selectAllInternshipApplyStatements,
  selectStatus,
};
