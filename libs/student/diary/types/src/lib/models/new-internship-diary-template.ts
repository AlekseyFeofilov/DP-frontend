import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export interface InternshipDiaryTask {
  beginDate: TuiDay;
  endDate: TuiDay;
  name: string;
  spentTime: TuiTime;
}

export interface InternshipDiaryAssessment {
  mark: number;
  text: string;
  date: TuiDay;
}

export interface NewInternshipDiaryTemplate {
  statementId: string;
  tasks: Array<InternshipDiaryTask>;
  assessment: InternshipDiaryAssessment;
}
