import {
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
} from '@dp/shared/statement/type';
import { NewInternshipDiaryTemplate } from '@dp/student/diary/types';
import { NewIntrenshipDiaryStatement } from '@dp/student/statement/types';
import { createAction, props } from '@ngrx/store';
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

const saveChangesSuccess = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] save changes of selected internship diary statement success`,
);

const requestRemove = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] request for removing an internship diary statement`,
  props<{
    readonly internshipDiaryStatement: InternshipDiaryStatement;
  }>(),
);

const remove = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] remove an internship diary statement`,
  props<{
    readonly internshipDiaryStatement: InternshipDiaryStatement;
  }>(),
);

const create = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] request for creation an internship diary statement`,
  props<{
    readonly newIntrenshipDiaryStatement: NewIntrenshipDiaryStatement;
  }>(),
);

const createTemplate = createAction(
  `[${DIARY_STORE_FEATURE_KEY}] request for creation an internship diary template`,
  props<{
    readonly semester: number;
    readonly newInternshipDiaryTemplate: NewInternshipDiaryTemplate;
  }>(),
);

export const diaryActions = {
  loadAll,
  loadAllSuccess,
  loadSelected,
  loadSelectedSuccess,
  setStatus,
  saveChangesSuccess,
  create,
  requestRemove,
  remove,
  createTemplate,
};
