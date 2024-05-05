import { NewIntrenshipStatement } from '@dp/student/statement/types';
import { createAction, props } from '@ngrx/store';

import { STATEMENT_STORE_FEATURE_KEY } from './statement-store.key';

const createInternship = createAction(
  `[${STATEMENT_STORE_FEATURE_KEY}] create an internship statement`,
  props<{
    readonly newInternshipStatement: NewIntrenshipStatement;
    readonly finishCallback?: () => void;
  }>(),
);

export const statementActions = {
  createInternship,
};
