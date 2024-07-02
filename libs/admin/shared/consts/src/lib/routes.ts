export const PATH_NAME = {
  home: '',

  statement: 'statement',

  internshipCheck: 'internship-check',
  internshipApply: 'internship-apply',

  internshipDiary: 'internship-diary',
  internshipDiaryId: ':internshipDiaryId',

  employment: 'employment',
  employmentHistory: 'employment-history',
  employmentId: ':employmentId',

  company: 'company',
  companyId: ':companyId',

  student: 'student',
  studentId: ':studentId',

  create: 'create',
  edit: 'edit',
} as const;

export const INTERNSHIP_APPLY_STATEMENT_ABSOLUTE_PATH = [
  '/',
  PATH_NAME.statement,
  PATH_NAME.internshipApply,
];

export const INTERNSHIP_CHECK_STATEMENT_ABSOLUTE_PATH = [
  '/',
  PATH_NAME.statement,
  PATH_NAME.internshipCheck,
];
