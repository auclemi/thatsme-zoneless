import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideZonelessChangeDetection } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
     provideRouter(routes, withViewTransitions()),
    provideZonelessChangeDetection(),
    
  ]
};
