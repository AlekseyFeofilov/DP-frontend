import {
  EmploymentStatus,
  EmploymentStudentStatus,
} from '@dp/admin/employment/types';
import { StoreStateStatus } from '@dp/shared/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TuiDay } from '@taiga-ui/cdk';
import { StudentStoreState } from './student-store-state.interface';
import { studentActions } from './student-store.actions';
import { STUDENT_STORE_FEATURE_KEY } from './student-store.key';

const initalState: StudentStoreState = {
  allStudents: [],
  profile: {
    selectedStudent: null,
    employmentHistory: [],
    internshipDiaries: [],
  },
  status: StoreStateStatus.Initial,
};

const reducer = createReducer(
  initalState,
  on(studentActions.loadAll, state => ({
    ...state,
    status: StoreStateStatus.Loading,
  })),
  on(studentActions.loadAllSuccess, (state, { students }) => ({
    ...state,
    allStudents: students,
    status: StoreStateStatus.Loaded,
  })),

  on(studentActions.loadSelected, state => ({
    ...state,
    profile: {
      selectedStudent: null,
      employmentHistory: [],
      internshipDiaries: [],
    },
    status: StoreStateStatus.Loading,
  })),
  on(studentActions.loadSelectedSuccess, (state, { student }) => ({
    ...state,
    profile: {
      ...state.profile,
      selectedStudent: student,
    },
    status: StoreStateStatus.Loaded,
  })),

  on(
    studentActions.loadEmploymentHistorySuccess,
    (state, { employmentHistory }) => ({
      ...state,
      profile: {
        ...state.profile,
        employmentHistory,
      },
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(
    studentActions.loadInternhsipDiariesSuccess,
    (state, { internshipDiaries }) => ({
      ...state,
      profile: {
        ...state.profile,
        internshipDiaries,
      },
      status: StoreStateStatus.Loaded,
    }),
  ),

  on(studentActions.cancelEmployment, state => ({
    ...state,
    profile: {
      ...state.profile,
      selectedStudent: state.profile.selectedStudent
        ? {
            ...state.profile.selectedStudent,
            employment: null,
            status: EmploymentStudentStatus.None,
          }
        : null,
      employmentHistory: state.profile.employmentHistory.map(item => {
        if (item.employment?.status === EmploymentStatus.Active) {
          return {
            ...item,
            date: TuiDay.currentLocal(),
            employment: {
              ...item.employment,
              status: EmploymentStatus.Inactive,
            },
          };
        }

        return item;
      }),
    },
    status: StoreStateStatus.Loaded,
  })),
);

export const studentStore = createFeature({
  name: STUDENT_STORE_FEATURE_KEY,
  reducer,
});
