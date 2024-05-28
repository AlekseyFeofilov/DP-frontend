import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { StatementStoreState } from './statement-store-state.interface';
import { statementActions } from './statement-store.actions';
import { STATEMENT_STORE_FEATURE_KEY } from './statement-store.key';

const initalState: StatementStoreState = {
  allInternshipCheckStatements: [],
  allInternshipApplyStatements: [],
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(
    statementActions.loadAllInternshipCheck,
    statementActions.loadAllInternshipApply,
    state => ({
      ...state,
      status: StoreStateStatus.Loading,
    }),
  ),

  on(
    statementActions.loadAllInternshipCheckSuccess,
    (state, { internshipCheckStatements }) => ({
      ...state,
      allInternshipCheckStatements: internshipCheckStatements,
      status: StoreStateStatus.Loaded,
    }),
  ),
  on(
    statementActions.loadAllInternshipApplySuccess,
    (state, { internshipApplyStatements }) => ({
      ...state,
      allInternshipApplyStatements: internshipApplyStatements,
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(
    statementActions.changeInternshipCheckStatus,
    (state, { statement, newStatus }) => ({
      ...state,
      allInternshipCheckStatements: state.allInternshipCheckStatements.map(
        originalStatement => {
          if (originalStatement.id === statement.id) {
            return { ...originalStatement, status: newStatus };
          }

          return originalStatement;
        },
      ),
    }),
  ),
  on(
    statementActions.changeInternshipApplyStatus,
    (state, { statement, newStatus }) => ({
      ...state,
      allInternshipApplyStatements: state.allInternshipApplyStatements.map(
        originalStatement => {
          if (originalStatement.id === statement.id) {
            return { ...originalStatement, status: newStatus };
          }

          return originalStatement;
        },
      ),
    }),
  ),
);

export const StatementStore = createFeature({
  name: STATEMENT_STORE_FEATURE_KEY,
  reducer,
});
