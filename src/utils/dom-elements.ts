/**
 * Type-safe DOM element ID registry
 * Eliminates magic strings and provides compile-time validation
 */
export enum FeesPageElementId {
	LOADING_STATE = 'loadingState',
	ERROR_STATE = 'errorState',
	CONTENT_STATE = 'contentState',
	FEES_CARD = 'feesCard',
	HIVE_COIN_LOGO = 'hiveCoinLogo',
	USERNAME = 'username',
	OPERATIONS_SUBTEXT = 'operationsSubtext',
	COMPARISON_TITLE = 'comparisonTitle',
	BLOCKCHAIN_LIST = 'blockchainList',
	SAVINGS_SECTION = 'savingsSection',
	ZERO_FEE = 'zeroFee',
	TOTAL_SAVED = 'totalSaved',
	FOOTER_LOGO = 'footerLogo',
	SHARE_BUTTON = 'shareBtn',
	SHARE_MENU = 'shareMenu',
	DROPDOWN_ICON = 'dropdownIcon',
	COPY_BUTTON = 'copyBtn',
	DOWNLOAD_BUTTON = 'downloadBtn'
}

export enum UserPageElementId {
	LOADING_STATE = 'loadingState',
	ERROR_STATE = 'errorState',
	CONTENT_STATE = 'contentState',
	USER_AVATAR = 'userAvatar',
	USERNAME = 'username',
	USER_OPERATIONS = 'userOperations',
	PERCENTAGE = 'percentage',
	GLOBAL_TOTAL = 'globalTotal',
	HIVE_LOGO = 'hiveLogo',
	STATS_CARD = 'statsCard',
	SHARE_BUTTON = 'shareBtn',
	SHARE_MENU = 'shareMenu',
	DROPDOWN_ICON = 'dropdownIcon',
	COPY_BUTTON = 'copyBtn',
	DOWNLOAD_BUTTON = 'downloadBtn'
}

/**
 * Generic type-safe DOM element getter
 */
export function getElementByIdSafe<T extends HTMLElement>(
	elementId: FeesPageElementId | UserPageElementId
): T | null {
	return document.getElementById(elementId) as T | null;
}

/**
 * Throws error if element not found (use when element is required)
 */
export function requireElementById<T extends HTMLElement>(
	elementId: FeesPageElementId | UserPageElementId
): T {
	const element = document.getElementById(elementId) as T | null;
	if (!element) {
		throw new Error(`[DOM Error] Required element not found: ${elementId}`);
	}
	return element;
}
