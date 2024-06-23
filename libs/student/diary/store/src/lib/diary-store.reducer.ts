import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { DiaryStoreState } from './diary-store-state.interface';
import { diaryActions } from './diary-store.actions';
import { DIARY_STORE_FEATURE_KEY } from './diary-store.key';

const initalState: DiaryStoreState = {
  allInternshipDiaryStatements: [],
  selectedInternshipDiaryStatement: null,
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
    allInternshipDiaryStatements: internshipDiaryStatements,
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
    selectedInternshipDiaryStatement: state.selectedInternshipDiaryStatement
      ? {
          ...state.selectedInternshipDiaryStatement,
          status,
        }
      : null,
  })),

  on(diaryActions.saveChangesSuccess, state => ({
    ...state,
    selectedInternshipDiaryStatementNewStatus: null,
    selectedInternshipDiaryStatementNewMark: null,
  })),

  on(diaryActions.remove, (state, { internshipDiaryStatement }) => ({
    ...state,
    allInternshipDiaryStatements: state.allInternshipDiaryStatements.filter(
      c => c.id != internshipDiaryStatement.id,
    ),
  })),
);

export const diaryStore = createFeature({
  name: DIARY_STORE_FEATURE_KEY,
  reducer,
});
