/**
 * Blockchain Fee Calculator Module
 *
 * Calculates and compares transaction fees across multiple blockchain networks
 * based on Hive user operation counts. Demonstrates cost savings of Hive's
 * feeless transaction model.
 *
 * @module fee-calculator
 */

// Core calculation functions
export {
	calculateFeeComparison,
	calculateFeeComparisonDefault
} from './calculators';

// Formatting utilities
export {
	formatCurrency,
	formatLargeNumber,
	formatPercentage,
	formatFeeComparisonResult,
	formatBlockchainCalculation,
	getBlockchainDisplayName,
	calculateTotalSavings,
	formatTotalSavings
} from './formatters';

// Data access
export {
	BLOCKCHAIN_FEE_MATRIX,
	getFeeHistoryForBlockchain,
	getFeeForYear
} from './feeMatrix';

// Types
export type {
	FeeCalculationInput,
	FeeComparisonResult,
	BlockchainFeeCalculation,
	YearlyFeeBreakdown,
	FormattedFeeComparison,
	FeeCalculationYear,
	YearlyFeeData,
	BlockchainFeeHistory,
	FeeMatrix
} from './types';

// Enums and constants
export {
	BlockchainNetwork
} from './types';

export {
	MIN_CALCULATION_YEAR,
	MAX_CALCULATION_YEAR,
	VALID_CALCULATION_YEARS,
	BLOCKCHAIN_DISPLAY_NAMES,
	BLOCKCHAIN_SYMBOLS,
	COMPARABLE_BLOCKCHAINS,
	HIVE_TRANSACTION_FEE_USD
} from './constants';
