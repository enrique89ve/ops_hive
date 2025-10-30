/**
 * Centralized i18n configuration
 * Single source of truth for all language settings
 */

// Supported language codes (must match astro.config.mjs)
export enum SupportedLocale {
	ENGLISH = "en",
	SPANISH = "es",
}

// Type alias for locale values
export type Locale = SupportedLocale;

// Default language for the application
export const DEFAULT_LOCALE: Locale = SupportedLocale.ENGLISH;

// Language display names for UI
export const LANGUAGE_NAMES: Record<Locale, string> = {
	[SupportedLocale.ENGLISH]: "English",
	[SupportedLocale.SPANISH]: "Español",
} as const;

// All supported locales as an array
export const SUPPORTED_LOCALES: readonly Locale[] = Object.values(SupportedLocale);

// URL path prefix for each locale (empty string for default locale)
export const LOCALE_PATH_PREFIX: Record<Locale, string> = {
	[SupportedLocale.ENGLISH]: "",
	[SupportedLocale.SPANISH]: "/es",
} as const;

// Helper to check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
	return SUPPORTED_LOCALES.includes(locale as Locale);
}

// Helper to get path prefix for a locale
export function getLocalePrefix(locale: Locale): string {
	return LOCALE_PATH_PREFIX[locale];
}

// Helper to get all non-default locales (for prefix stripping)
export function getNonDefaultLocales(): readonly Locale[] {
	return SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);
}
