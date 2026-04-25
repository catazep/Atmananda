const TRANSLATION_KEY_PLACEHOLDER = Symbol('TRANSLATION_KEY_PLACEHOLDER');
type TranslationKeyPlaceholder = typeof TRANSLATION_KEY_PLACEHOLDER;

export interface TranslationStructure {
  [key: string]: TranslationStructure | TranslationKeyPlaceholder;
}

export type TranslationKeysOf<T extends TranslationStructure> = {
  [P in keyof T]: T[P] extends TranslationStructure ? TranslationKeysOf<T[P]> : string;
};

// Normalizes all leaf values to `string` so path-strings and translated strings
// become the same type, enabling structural key comparison between JSON and CORE_TRANSLATION_KEYS.
export type TranslationValues<T> = {
  [K in keyof T]: T[K] extends object ? TranslationValues<T[K]> : string;
};

export const defineTranslationKeys = <T extends TranslationStructure>(
  translationStructure: (t: TranslationKeyPlaceholder) => T,
): TranslationKeysOf<T> => {
  const generateTranslationKeys = <U extends TranslationStructure>(structure: U, prefix?: string): TranslationKeysOf<U> =>
    Object.keys(structure).reduce<Partial<TranslationKeysOf<U>>>((keys, key) => {
      const value = structure[key];
      const path = prefix === undefined ? key : `${prefix}.${key}`;

      return {
        ...keys,
        [key]: value === TRANSLATION_KEY_PLACEHOLDER ? path : generateTranslationKeys(value, path),
      };
    }, {}) as TranslationKeysOf<U>;

  return generateTranslationKeys(translationStructure(TRANSLATION_KEY_PLACEHOLDER));
};
