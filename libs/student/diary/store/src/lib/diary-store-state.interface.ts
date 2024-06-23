import { InternshipDiaryStatement } from '@dp/shared/statement/type';
import { StoreStateStatus } from '@dp/shared/types';

export interface DiaryStoreState {
  readonly allInternshipDiaryStatements: ReadonlyArray<InternshipDiaryStatement>;
  readonly selectedInternshipDiaryStatement: InternshipDiaryStatement | null;
  readonly status: StoreStateStatus;
}
