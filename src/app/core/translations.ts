import { defineTranslationKeys } from './translation/define-translation-keys';
import EnJson from '../../assets/i18n/en.json';
import RoJson from '../../assets/i18n/ro.json';
import FrJson from '../../assets/i18n/fr.json';

export const CORE_TRANSLATION_KEYS = defineTranslationKeys((t) => ({
  MENU_ITEMS: {
    HOME: t,
    SCHEDULE: t,
    PRESENTATION: t,
    ABOUT: t,
    REGISTER: t,
    LOCATION: t,
  },
  TITLE: {
    LINE_1: t,
    LINE_2: t,
    LINE_3: t,
    LINE_4: t,
    TIME: t,
    REGISTER_NOW: t,
  },
  SCHEDULE: {
    TITLE: t,
    FRIDAY: {
      TITLE: t,
      LINE_1: t,
      LINE_2: t,
      LINE_3: t,
    },
    SATURDAY: {
      TITLE: t,
      LINE_1: t,
      LINE_2: t,
      LINE_3: t,
      LINE_4: t,
      LINE_5: t,
    },
    SUNDAY: {
      TITLE: t,
      LINE_1: t,
      LINE_2: t,
      LINE_3: t,
      LINE_4: t,
      LINE_5: t,
    },
  },
  PRESENTATION: {
    TITLE: t,
    CONTENT: {
      P1: t,
      P2: t,
      P3: t,
    }
  },
  QUOTE: {
    TEXT: t,
    AUTHOR: t,
  },
  ABOUT: {
    TITLE: t,
    CONTENT: {
      P1: t,
      P2: t,
      P3: t,
    },
  },
  REGISTER: {
    TITLE: t,
    DESCRIPTION: t,
    AMOUNT: t,
    FORM: {
      TITLE: t,
      BUTTON_OPEN: t,
      BUTTON_CLOSE: t,
      INVITATION: t,
    },
    SUPPORT: {
      TITLE: t,
      DESCRIPTION: t,
      VISIT_ASHRAM: t,
    },
  },
  LOCATION: {
    INFO: t,
    ACCOMMODATION: t,
    FOOD: t,
    EXTRA_INFO: t,
  },
  FOOTER: {
    ORGANIZER_1: t,
    ORGANIZER_2: t,
    COPYRIGHT: t,
  },
}));

type _KeysOf = typeof CORE_TRANSLATION_KEYS;

type _FlatKeys<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends object
    ? _FlatKeys<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

type _Assert<TJson> =
  [Exclude<_FlatKeys<_KeysOf>, _FlatKeys<TJson>>] extends [never]
    ? [Exclude<_FlatKeys<TJson>, _FlatKeys<_KeysOf>>] extends [never]
      ? true
      : { 'Extra keys in JSON not in translations.ts': Exclude<_FlatKeys<TJson>, _FlatKeys<_KeysOf>> }
    : { 'Keys missing from JSON': Exclude<_FlatKeys<_KeysOf>, _FlatKeys<TJson>> };

// Compile error here (hover for details) means JSON file and translations.ts are out of sync
export const _en: true = true as _Assert<typeof EnJson>;
export const _ro: true = true as _Assert<typeof RoJson>;
export const _fr: true = true as _Assert<typeof FrJson>;
