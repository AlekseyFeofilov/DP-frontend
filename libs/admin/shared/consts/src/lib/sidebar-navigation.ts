import { NavigationItem } from '@dp/shared/layout';

export const SIDEBAR_NAVIGATION: ReadonlyArray<NavigationItem> = [
  {
    path: '',
    name: 'Главная',
    icon: 'tuiIconHomeLarge',
  },
  {
    path: '',
    name: 'Дневники практики',
    icon: 'tuiIconFileTextLarge',
  },
  {
    path: '',
    name: 'Трудоустройства',
    icon: 'tuiIconClipboardLarge',
  },
  {
    path: '',
    name: 'Компании',
    icon: 'tuiIconBriefcaseLarge',
  },
] as const;
