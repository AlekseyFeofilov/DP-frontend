import { NavigationItem } from '@dp/shared/layout';
import { PATH_NAME } from './routes';

export const SIDEBAR_NAVIGATION: ReadonlyArray<NavigationItem> = [
  {
    path: PATH_NAME.home,
    pathMatch: 'full',
    name: 'Главная',
    icon: 'tuiIconHomeLarge',
  },
  {
    path: PATH_NAME.internshipDiary,
    name: 'Дневники практики',
    icon: 'tuiIconFileTextLarge',
  },
  {
    path: PATH_NAME.statement,
    name: 'Заявления',
    icon: 'tuiIconClipboardLarge',
  },
  {
    path: PATH_NAME.employmentVariant,
    name: 'Варианты трудоустройства',
    icon: 'tuiIconPenToolLarge',
  },
] as const;
