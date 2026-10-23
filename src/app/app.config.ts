import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';


import { provideNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import { provideSecurityAuth } from 'security-auth-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityAuth({ loginRoute: '/login', defaultAfterLoginRoute: '/restaurantes' }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideNgxMask(),
  ],
};
