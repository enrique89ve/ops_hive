import type {
	FeeComparisonResult,
	FormattedFeeComparison,
	BlockchainFeeCalculation
} from './types';
import { BlockchainNetwork } from './types';
import {
	BLOCKCHAIN_DISPLAY_NAMES,
	CURRENCY_LOCALE,
	CURRENCY_CODE,
	CURRENCY_DECIMAL_PLACES
} from './constants';

/**
 * Formats a number as USD currency
 * @param amount - The amount in USD
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(
	amount: number,
	decimals: number = CURRENCY_DECIMAL_PLACES
): string {
	return new Intl.NumberFormat(CURRENCY_LOCALE, {
		style: 'currency',
		currency: CURRENCY_CODE,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	}).format(amount);
}

/**
 * Formats a large number with thousand separators
 * @param value - The number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export function formatLargeNumber(value: number): string {
	return new Intl.NumberFormat(CURRENCY_LOCALE).format(Math.floor(value));
}

/**
 * Formats a percentage value
 * @param value - The percentage value (0-100)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., "45.67%")
 */
export function formatPercentage(value: number, decimals: number = 2): string {
	return `${value.toFixed(decimals)}%`;
}

/**
 * Gets human-readable display name for a blockchain
 * @param blockchain - The blockchain network enum value
 * @returns Display name string
 */
export function getBlockchainDisplayName(blockchain: BlockchainNetwork): string {
	return BLOCKCHAIN_DISPLAY_NAMES[blockchain];
}

/**
 * Formats a single blockchain calculation for display
 * @param calculation - Raw blockchain fee calculation
 * @param totalOperations - Total operation count (for percentage calculation)
 * @param hiveSavings - Amount saved versus Hive
 * @returns Formatted comparison object ready for UI display
 */
export function formatBlockchainCalculation(
	calculation: BlockchainFeeCalculation,
	totalOperations: number,
	hiveSavings: number
): FormattedFeeComparison {
	const percentageOfOperations = (calculation.totalFeeUsd / totalOperations) * 100;

	return {
		blockchain: calculation.blockchain,
		blockchainDisplayName: getBlockchainDisplayName(calculation.blockchain),
		totalFeeUsd: calculation.totalFeeUsd,
		totalFeeFormatted: formatCurrency(calculation.totalFeeUsd, 0),
		savingsVsHive: formatCurrency(hiveSavings, 0),
		percentageOfOperations: formatPercentage(percentageOfOperations)
	};
}

/**
 * Formats complete fee comparison result for display
 * @param result - Raw fee comparison result
 * @returns Array of formatted comparisons sorted by total fee (descending)
 */
export function formatFeeComparisonResult(
	result: FeeComparisonResult
): FormattedFeeComparison[] {
	const formatted: FormattedFeeComparison[] = [];

	for (const calculation of result.calculations) {
		// Skip Hive in formatted output (it's always $0)
		if (calculation.blockchain === BlockchainNetwork.HIVE) {
			continue;
		}

		const savings = result.hiveSavings[calculation.blockchain] ?? 0;

		formatted.push(
			formatBlockchainCalculation(
				calculation,
				result.totalOperations,
				savings
			)
		);
	}

	// Sort by total fee descending (most expensive first)
	return formatted.sort((a, b) => b.totalFeeUsd - a.totalFeeUsd);
}

/**
 * Calculates total savings across all blockchains combined
 * @param result - Fee comparison result
 * @returns Total USD saved by using Hive instead of other chains
 */
export function calculateTotalSavings(result: FeeComparisonResult): number {
	return Object.values(result.hiveSavings).reduce((sum, saving) => sum + saving, 0);
}

/**
 * Formats total savings for display
 * @param result - Fee comparison result
 * @returns Formatted total savings string
 */
export function formatTotalSavings(result: FeeComparisonResult): string {
	const total = calculateTotalSavings(result);
	return formatCurrency(total, 0);
}
