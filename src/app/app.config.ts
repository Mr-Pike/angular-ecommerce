import { ApplicationConfig, provideBrowserGlobalErrorListeners, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { appTitleProvider } from './app.token';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideHttpClient, withFetch } from '@angular/common/http';

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    appTitleProvider,
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },
    provideHttpClient(withFetch())
  ]
};
