import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../transloco-loader';
import { provideHttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
class MaterialDesignIconsModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MaterialDesignIconsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['ro', 'en'], //, 'fr'
        defaultLang: 'ro',
        fallbackLang: 'ro',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    // MaterialDesignIconsModule,
  ],
};
