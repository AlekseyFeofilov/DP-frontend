import {
  CreateInternshipDiaryTemplateDto,
  InternshipDiaryAssessmentDto,
  InternshipDiaryTaskDto,
} from '@dp/student/diary/dto';
import { MILLISECONDS_IN_HOUR } from '@taiga-ui/cdk';
import {
  InternshipDiaryAssessment,
  InternshipDiaryTask,
  NewInternshipDiaryTemplate,
} from '../models/new-internship-diary-template';

export function convertNewInternshipDiaryTemplateToDto(
  newInternshipDiaryTemplate: NewInternshipDiaryTemplate,
): CreateInternshipDiaryTemplateDto {
  return {
    internshipDiaryRequestId: newInternshipDiaryTemplate.statementId,
    internshipDiaryTasks: newInternshipDiaryTemplate.tasks.map(
      convertInternshipDiaryTaskToDto,
    ),
    internshipDiaryAssessment: convertInternshipDiaryAssessmentToDto(
      newInternshipDiaryTemplate.assessment,
    ),
  };
}

function convertInternshipDiaryTaskToDto(
  internshipDiaryTask: InternshipDiaryTask,
): InternshipDiaryTaskDto {
  return {
    beginDate: internshipDiaryTask.beginDate.toJSON(),
    endDate: internshipDiaryTask.endDate.toJSON(),
    name: internshipDiaryTask.name,
    timeSpentHours:
      internshipDiaryTask.spentTime.toAbsoluteMilliseconds() /
      MILLISECONDS_IN_HOUR,
  };
}

function convertInternshipDiaryAssessmentToDto(
  internshipDiaryAssessment: InternshipDiaryAssessment,
): InternshipDiaryAssessmentDto {
  return {
    mark: internshipDiaryAssessment.mark,
    text: internshipDiaryAssessment.text,
    date: internshipDiaryAssessment.date.toJSON(),
  };
}
