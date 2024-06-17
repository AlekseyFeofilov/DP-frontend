export const ATTACHMENT_ENTITY_TYPE = {
  EmploymentVariant: {
    key: 'EmploymentVariant',
    description: 'Вариант трудоустройства',
  },
  InternshipCheckStatement: {
    key: 'InternshipRequest',
    description: 'Заявка на прохождение правтики',
  },
  InternshipApplyStatement: {
    key: 'EmploymentRequest',
    description: 'Заявка на трудоустройство',
  },
  InternshipDiaryStatement: {
    key: 'InternshipDiaryRequest',
    description: 'Заявка для дневника практики',
  },
  InternshipDiaryTemplate: {
    key: 'Template',
    description: 'Шаблон документа',
  },
  CourseWorkStatement: {
    key: 'CourseWorkRequest',
    description: 'Заявка для для курсовых и ВКР',
  },
} as const;
