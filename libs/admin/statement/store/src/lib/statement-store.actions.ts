import { createAction, props } from '@ngrx/store';

import {
  InternshipApplyStatement,
  InternshipApplyStatementStatus,
  InternshipCheckStatement,
  InternshipCheckStatementStatus,
} from '@dp/shared/statement/type';
import { STATEMENT_STORE_FEATURE_KEY } from './statement-store.key';

const loadAllInternshipCheck = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] load all internship check statements`,
);

const loadAllInternshipApply = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] load all internship apply statements`,
);

const loadAllInternshipCheckSuccess = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] load all internship check statements success`,
  props<{
    readonly internshipCheckStatements: ReadonlyArray<InternshipCheckStatement>;
  }>(),
);

const loadAllInternshipApplySuccess = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] load all internship apply statements success`,
  props<{
    readonly internshipApplyStatements: ReadonlyArray<InternshipApplyStatement>;
  }>(),
);

const requestChangeInternshipCheckStatus = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] request for changing an internship check statement status`,
  props<{
    readonly statement: InternshipCheckStatement;
    readonly newStatus:
      | InternshipCheckStatementStatus.Accepted
      | InternshipCheckStatementStatus.Declined;
  }>(),
);

const changeInternshipCheckStatus = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] create an internship check statement`,
  props<{
    readonly statement: InternshipCheckStatement;
    readonly newStatus:
      | InternshipCheckStatementStatus.Accepted
      | InternshipCheckStatementStatus.Declined;
  }>(),
);

const requestChangeInternshipApplyStatus = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] request for changing an internship apply statement status`,
  props<{
    readonly statement: InternshipApplyStatement;
    readonly newStatus:
      | InternshipApplyStatementStatus.Accepted
      | InternshipApplyStatementStatus.Declined;
  }>(),
);

const changeInternshipApplyStatus = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] change an internship apply statement status`,
  props<{
    readonly statement: InternshipApplyStatement;
    readonly newStatus:
      | InternshipApplyStatementStatus.Accepted
      | InternshipApplyStatementStatus.Declined;
  }>(),
);

export const statementActions = {
  loadAllInternshipCheck,
  loadAllInternshipApply,
  loadAllInternshipCheckSuccess,
  loadAllInternshipApplySuccess,
  requestChangeInternshipCheckStatus,
  changeInternshipCheckStatus,
  requestChangeInternshipApplyStatus,
  changeInternshipApplyStatus,
};
