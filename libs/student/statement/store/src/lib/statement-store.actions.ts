import { NewIntrenshipCheckStatement } from '@dp/student/statement/types';
import { createAction, props } from '@ngrx/store';

import {
  InternshipApplyStatement,
  InternshipCheckStatement,
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

const createInternshipCheck = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] create an internship check statement`,
  props<{
    readonly newInternshipCheckStatement: NewIntrenshipCheckStatement;
    readonly finishCallback?: () => void;
  }>(),
);

const requestCreateInternshipApply = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] request for creating an internship apply statement`,
  props<{
    readonly baseStatement: InternshipCheckStatement;
  }>(),
);

const createInternshipApply = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] create an internship apply statement`,
  props<{
    readonly baseStatement: InternshipCheckStatement;
  }>(),
);

export const statementActions = {
  loadAllInternshipCheck,
  loadAllInternshipApply,
  loadAllInternshipCheckSuccess,
  loadAllInternshipApplySuccess,
  createInternshipCheck,
  requestCreateInternshipApply,
  createInternshipApply,
};
