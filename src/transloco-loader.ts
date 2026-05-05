import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { VERSION } from './version';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  public getTranslation(lang: string) {
    return this.http
      .get<Translation>(`/assets/i18n/${lang}.json?v=${VERSION}`)
      .pipe(map((t) => t));
  }
}
