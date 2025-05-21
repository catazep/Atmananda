import { defineTranslationKeys } from './translation/define-translation-keys';

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
    PLACE: t,
    REGISTER_NOW: t,
  },
  SCHEDULE: {
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
    },
    TRANSLATION: {
      TITLE: t,
      DESCRIPTION: t,
    },
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
    },
  },
  LOCATION: {
    INFO: t,
  },
  FOOTER: {
    ORGANIZER: t,
    COPYRIGHT: t,
  },
}));
