import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideToastr(),
    provideEnvironmentNgxMask(),
  ],
}).catch((err) => console.error(err));
