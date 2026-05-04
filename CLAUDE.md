# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 landing page and registration portal for "Intensive Satsang Programme" — spiritual talks with Swami Atmananda in Brașov, Romania (June 12-14, 2026). Features event details, video carousel, registration forms, and multi-language support (Romanian, English, French).

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/atmananda/
npm run watch      # Watch mode (dev configuration)
npm test           # Unit tests via Karma/Jasmine
```

No linting script is configured in package.json; use `ng lint` if needed.

## Architecture

### Single-Component Design

The app is structured as a single-page site with **one root component** (`AppComponent`) that renders all sections: navigation, hero, presentation, about, video carousel, schedule, registration, and map. There is no routing in use.

### State Management

All component state uses **Angular Signals**:
- `currentIndex` — active carousel slide
- `navToggle` — mobile hamburger state
- `toggleRegistrationForm` — registration iframe visibility

### Translations (Transloco)

Translations are strongly typed through a custom pipeline:

1. **`src/app/core/translation/translations.ts`** — defines all translation keys as constants (`CORE_TRANSLATION_KEYS`)
2. **`src/app/core/translation/define-translation-keys.ts`** — type helper that validates JSON keys match the key definitions at compile time
3. **`src/assets/i18n/{en,ro,fr}.json`** — actual translation strings
4. **`src/transloco-loader.ts`** — HTTP loader serving translation files

When adding a new translation string: add the key to `translations.ts`, add values to all three JSON files, and use `CORE_TRANSLATION_KEYS.yourKey` in templates (never raw strings).

Language preference is persisted in `localStorage`. The language switcher cycles between `ro` and `en` (French is available but not exposed in UI by default).

### External Integrations

- **JotForm** — Registration section embeds language-specific iframes (one per language)
- **YouTube** — Video carousel with 3 embedded satsang videos
- **Google Maps** — Venue location embed

### Styling

- SCSS throughout; global styles in `src/styles.scss`
- Angular Material with `cyan-orange` prebuilt theme
- FontAwesome Free 7.x and Material Design Icons for icons
- `flag-icons` for language flag display
- Production budgets: 500 kB initial warning, 1 MB error; component styles 2 kB warning, 4 kB error
