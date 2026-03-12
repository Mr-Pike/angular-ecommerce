import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { APP_TITLE } from './app.token';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

const ValueProvider = {
  provide: APP_TITLE,
  useValue: 'Bienvenue sur Zenika Ecommerce',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    ValueProvider
  ]
};
