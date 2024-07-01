import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideChat } from '@dp/shared/chat/shell';
import { BASE_URL, authInterceptor } from '@dp/shared/core';
import { provideCommonEffects } from '@dp/shared/effects';
import { provideNotifications } from '@dp/shared/notification/shell';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { of } from 'rxjs';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideRouterStore(),
    provideStore({ router: routerReducer }),
    provideCommonEffects(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideChat(),
    provideNotifications(),
    importProvidersFrom(TuiRootModule, TuiDialogModule, TuiAlertModule),
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    {
      provide: BASE_URL,
      useValue: 'http://alexfil888.fvds.ru:8080/api',
    },
  ],
};
