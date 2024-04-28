import {
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiRootModule,
} from '@taiga-ui/core';
import {
  importProvidersFrom,
  ApplicationConfig,
  LOCALE_ID,
  isDevMode,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BASE_URL, authInterceptor } from '@dp/shared/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideCommonEffects } from '@dp/shared/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
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
