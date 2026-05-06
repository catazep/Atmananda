import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

declare const BUILD_HASH: string;

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  public getTranslation(lang: string) {
    return this.http
      .get<Translation>(`/assets/i18n/${lang}.json?v=${BUILD_HASH}`)
      .pipe(map((t) => t));
  }
}
