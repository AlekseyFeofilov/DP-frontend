export const NOTIFICATION_TEXTS = {
  get: {
    error: 'Не удалось получить данные',
  },
  create: {
    error: 'Ошибка создания',
  },
  edit: {
    error: 'Не удалось отредактировать',
  },
  remove: {
    error: 'Возникла ошибка при удалении',
  },
} as const;

export const NOTIFICATION_DESCRIPTION = {
  error: 'Данные не сохранятся',
} as const;
