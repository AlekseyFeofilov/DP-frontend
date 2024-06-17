import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { DiaryStoreState } from './diary-store-state.interface';
import { diaryActions } from './diary-store.actions';
import { DIARY_STORE_FEATURE_KEY } from './diary-store.key';

const initalState: DiaryStoreState = {
  allInternshipDiaryStatements: [],
  selectedInternshipDiaryStatement: null,
  selectedInternshipDiaryStatementNewStatus: null,
  selectedInternshipDiaryStatementNewMark: null,
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(diaryActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(diaryActions.loadAllSuccess, (state, { internshipDiaryStatements }) => ({
    ...state,
    allInternshipDiaryStatements: internshipDiaryStatements.filter(
      statement => statement.status !== InternshipDiaryStatementStatus.No,
    ),
    status: StoreStateStatus.Loaded,
  })),

  on(diaryActions.loadSelected, state => ({
    ...state,
    selectedInternshipDiaryStatementStatus: null,
    status: StoreStateStatus.Loading,
  })),
  on(
    diaryActions.loadSelectedSuccess,
    (state, { internshipDiaryStatement }) => ({
      ...state,
      selectedInternshipDiaryStatement: internshipDiaryStatement,
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(diaryActions.setStatus, (state, { status }) => ({
    ...state,
    selectedInternshipDiaryStatementNewStatus: status,
  })),

  on(diaryActions.setMark, (state, { mark }) => ({
    ...state,
    selectedInternshipDiaryStatementNewMark: mark,
  })),

  on(diaryActions.saveChangesSuccess, state => ({
    ...state,
    selectedInternshipDiaryStatementNewStatus: null,
    selectedInternshipDiaryStatementNewMark: null,
  })),
);

export const diaryStore = createFeature({
  name: DIARY_STORE_FEATURE_KEY,
  reducer,
});
