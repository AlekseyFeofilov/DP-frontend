export interface InternshipDiaryTaskDto {
  beginDate: string;
  endDate: string;
  name: string;
  timeSpentHours: number;
}

export interface InternshipDiaryAssessmentDto {
  mark: number;
  text: string;
  date: string;
}

export interface CreateInternshipDiaryTemplateDto {
  internshipDiaryRequestId: string;
  internshipDiaryTasks: Array<InternshipDiaryTaskDto>;
  internshipDiaryAssessment: InternshipDiaryAssessmentDto;
}
