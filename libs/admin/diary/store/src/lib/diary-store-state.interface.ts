import {
  InternshipDiaryStatement,
  InternshipDiaryStatementStatus,
} from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';

export interface DiaryStoreState {
  readonly allInternshipDiaryStatements: ReadonlyArray<InternshipDiaryStatement>;
  readonly selectedInternshipDiaryStatement: InternshipDiaryStatement | null;
  readonly selectedInternshipDiaryStatementNewStatus: InternshipDiaryStatementStatus | null;
  readonly selectedInternshipDiaryStatementNewMark: number | null;
  readonly status: StoreStateStatus;
}
