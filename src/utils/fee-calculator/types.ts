/**
 * Represents a blockchain network supported for fee comparison
 */
export enum BlockchainNetwork {
	BITCOIN = 'bitcoin',
	ETHEREUM = 'ethereum',
	SOLANA = 'solana',
	BNB_CHAIN = 'bnb_chain',
	POLKADOT = 'polkadot',
	HIVE = 'hive'
}

/**
 * Valid years for fee calculations (2020-2025)
 */
export type FeeCalculationYear = 2020 | 2021 | 2022 | 2023 | 2024 | 2025;

/**
 * Fee data for a single blockchain in a specific year
 * @property year - The calendar year
 * @property averageFeeUsd - Average transaction fee in USD
 */
export interface YearlyFeeData {
	year: FeeCalculationYear;
	averageFeeUsd: number;
}

/**
 * Complete fee history for a single blockchain
 * @property blockchain - The blockchain network identifier
 * @property feeHistory - Array of yearly fee data, ordered chronologically
 */
export interface BlockchainFeeHistory {
	blockchain: BlockchainNetwork;
	feeHistory: readonly YearlyFeeData[];
}

/**
 * Fee matrix containing all blockchain fee data
 * Map structure: BlockchainNetwork -> YearlyFeeData[]
 */
export type FeeMatrix = ReadonlyMap<BlockchainNetwork, readonly YearlyFeeData[]>;

/**
 * Input parameters for fee calculation
 * @property totalOperations - Total number of operations/transactions
 * @property startYear - First year to include in calculation
 * @property endYear - Last year to include in calculation
 */
export interface FeeCalculationInput {
	totalOperations: number;
	startYear: FeeCalculationYear;
	endYear: FeeCalculationYear;
}

/**
 * Breakdown of operations and fees for a single year
 * @property year - The calendar year
 * @property operationCount - Number of operations in this year
 * @property averageFeeUsd - Average fee per operation
 * @property totalFeeUsd - Total fee cost for this year
 */
export interface YearlyFeeBreakdown {
	year: FeeCalculationYear;
	operationCount: number;
	averageFeeUsd: number;
	totalFeeUsd: number;
}

/**
 * Complete fee calculation result for a single blockchain
 * @property blockchain - The blockchain network
 * @property totalFeeUsd - Sum of all yearly fees
 * @property yearlyBreakdown - Detailed breakdown by year
 */
export interface BlockchainFeeCalculation {
	blockchain: BlockchainNetwork;
	totalFeeUsd: number;
	yearlyBreakdown: YearlyFeeBreakdown[];
}

/**
 * Comparison results across all blockchains
 * @property totalOperations - Input operation count
 * @property calculations - Fee calculations for each blockchain
 * @property hiveSavings - Amount saved by using Hive (always 0 fees)
 */
export interface FeeComparisonResult {
	totalOperations: number;
	calculationPeriod: {
		startYear: FeeCalculationYear;
		endYear: FeeCalculationYear;
	};
	calculations: BlockchainFeeCalculation[];
	hiveSavings: {
		[key in BlockchainNetwork]?: number;
	};
}

/**
 * Formatted fee calculation for display purposes
 * @property blockchain - The blockchain network
 * @property blockchainDisplayName - Human-readable blockchain name
 * @property totalFeeFormatted - Formatted total fee with currency symbol
 * @property savingsVsHive - Amount saved by using Hive instead
 */
export interface FormattedFeeComparison {
	blockchain: BlockchainNetwork;
	blockchainDisplayName: string;
	totalFeeUsd: number;
	totalFeeFormatted: string;
	savingsVsHive: string;
	percentageOfOperations: string;
}
