import { createAction, props } from '@ngrx/store';

import {
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
} from '@dp/shared/statement/type';
import { DIARY_STORE_FEATURE_KEY } from './diary-store.key';

const loadAll = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] load all internship diary statements`,
);

const loadAllSuccess = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] load all internship diary statements success`,
  props<{
    readonly internshipDiaryStatements: ReadonlyArray<InternshipDiaryStatement>;
  }>(),
);

const loadSelected = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] load selected internship diary statement`,
  props<{ readonly id: string }>(),
);

const loadSelectedSuccess = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] load selected internship diary statement success`,
  props<{ readonly internshipDiaryStatement: InternshipDiaryStatement }>(),
);

const setStatus = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] set new status to selected internship diary statement`,
  props<{ readonly status: InternshipDiaryStatementStatus }>(),
);

const setMark = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] set new mark to selected internship diary statement`,
  props<{ readonly mark: number }>(),
);

const saveChanges = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] save changes of internship diary statement`,
);

const saveChangesSuccess = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] save changes of selected internship diary statement success`,
);

export const diaryActions = {
  loadAll,
  loadAllSuccess,
  loadSelected,
  loadSelectedSuccess,
  setMark,
  setStatus,
  saveChanges,
  saveChangesSuccess,
};
