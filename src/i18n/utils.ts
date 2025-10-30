import en from "./locales/en.json";
import es from "./locales/es.json";
import {
	DEFAULT_LOCALE,
	LANGUAGE_NAMES,
	SupportedLocale,
	type Locale,
} from "./config";
import { getLocaleFromPathname } from "./url-utils";

// Re-export types and constants for convenience
export type { Locale };
export { SupportedLocale, DEFAULT_LOCALE };
export const languages = LANGUAGE_NAMES;

// Translation data
export const ui = {
	[SupportedLocale.ENGLISH]: en,
	[SupportedLocale.SPANISH]: es,
} as const;

/**
 * Extracts language from URL using pathname parsing
 * @param url - The URL to parse
 * @returns The detected locale
 */
export function getLangFromUrl(url: URL): Locale {
	return getLocaleFromPathname(url.pathname);
}

/**
 * Creates a translation function for the specified locale
 * @param lang - The target locale
 * @returns Translation function
 */
export function useTranslations(lang: Locale) {
	return function t(key: string): string {
		const keys = key.split(".");
		let value: any = ui[lang];

		for (const k of keys) {
			if (value && typeof value === "object" && k in value) {
				value = value[k];
			} else {
				console.warn(
					`[i18n] Missing translation key: ${key} for locale: ${lang}`
				);
				return key;
			}
		}

		return typeof value === "string" ? value : key;
	};
}
