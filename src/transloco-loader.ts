import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const CACHE_BUST = Math.random().toString(36).slice(2);

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  public getTranslation(lang: string) {
    return this.http
      .get<Translation>(`/assets/i18n/${lang}.json?v=${CACHE_BUST}`)
      .pipe(map((t) => t));
  }
}
