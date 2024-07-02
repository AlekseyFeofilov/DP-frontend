import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';

import { InternshipCheckStatementStatus } from '@dp/shared/statement/type';
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

  // TODO
  on(statementActions.createInternshipApply, (state, { baseStatement }) => ({
    ...state,
    allInternshipCheckStatements: state.allInternshipCheckStatements.map(
      statement => {
        if (statement.id === baseStatement.id) {
          return {
            ...statement,
            status: InternshipCheckStatementStatus.Unactual,
          };
        }

        return statement;
      },
    ),
  })),
);

export const StatementStore = createFeature({
  name: STATEMENT_STORE_FEATURE_KEY,
  reducer,
});
