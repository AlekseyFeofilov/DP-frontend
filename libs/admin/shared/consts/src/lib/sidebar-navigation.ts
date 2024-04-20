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
    path: PATH_NAME.practiceDiary,
    name: 'Дневники практики',
    icon: 'tuiIconFileTextLarge',
  },
  {
    path: PATH_NAME.employment,
    name: 'Трудоустройства',
    icon: 'tuiIconClipboardLarge',
  },
  {
    path: PATH_NAME.company,
    name: 'Компании',
    icon: 'tuiIconBriefcaseLarge',
  },
] as const;
