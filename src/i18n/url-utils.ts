import {
	DEFAULT_LOCALE,
	getNonDefaultLocales,
	getLocalePrefix,
	type Locale,
} from "./config";

/**
 * Extracts the base path from a URL by removing the language prefix
 * @param pathname - The URL pathname (e.g., "/es/user" or "/user")
 * @returns The base path without language prefix (e.g., "/user")
 */
export function stripLocalePrefix(pathname: string): string {
	const nonDefaultLocales = getNonDefaultLocales();

	for (const locale of nonDefaultLocales) {
		const prefix = getLocalePrefix(locale);

		// Handle both "/es/path" and "/es" cases
		if (pathname === prefix) {
			return "/";
		}

		if (pathname.startsWith(`${prefix}/`)) {
			return pathname.substring(prefix.length);
		}
	}

	return pathname;
}

/**
 * Builds a URL path with the appropriate language prefix
 * @param basePath - The base path without language prefix
 * @param locale - The target locale
 * @param searchParams - Optional query string (e.g., "?u=alice")
 * @returns Complete URL path with locale prefix and query params
 */
export function buildLocalizedPath(
	basePath: string,
	locale: Locale,
	searchParams: string = ""
): string {
	const prefix = getLocalePrefix(locale);

	// Default locale: no prefix
	if (locale === DEFAULT_LOCALE) {
		return `${basePath}${searchParams}`;
	}

	// Other locales: add prefix
	return `${prefix}${basePath}${searchParams}`;
}

/**
 * Detects the locale from a URL pathname
 * @param pathname - The URL pathname
 * @returns The detected locale or default locale
 */
export function getLocaleFromPathname(pathname: string): Locale {
	const segments = pathname.split("/").filter(Boolean);

	const nonDefaultLocales = getNonDefaultLocales();
	for (const locale of nonDefaultLocales) {
		const prefix = getLocalePrefix(locale).substring(1); // Remove leading "/"
		if (segments.length > 0 && segments[0] === prefix) {
			return locale;
		}
	}

	return DEFAULT_LOCALE;
}

/**
 * Switches the locale of a given URL while preserving path and query params
 * @param currentUrl - The current URL object
 * @param targetLocale - The locale to switch to
 * @returns The new URL string
 */
export function switchLocale(currentUrl: URL, targetLocale: Locale): string {
	const currentPath = currentUrl.pathname;
	const searchParams = currentUrl.search;

	const basePath = stripLocalePrefix(currentPath);
	return buildLocalizedPath(basePath, targetLocale, searchParams);
}
