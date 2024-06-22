import { NavigationItem } from '@dp/shared/types';
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
    path: PATH_NAME.employment,
    name: 'Трудоустройства',
    icon: 'tuiIconPaperclipLarge',
  },
  {
    path: PATH_NAME.company,
    name: 'Компании',
    icon: 'tuiIconBriefcaseLarge',
  },
] as const;
