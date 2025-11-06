import type {
	FeeCalculationInput,
	FeeComparisonResult,
	BlockchainFeeCalculation,
	YearlyFeeBreakdown,
	FeeCalculationYear
} from './types';
import { BlockchainNetwork } from './types';
import {
	COMPARABLE_BLOCKCHAINS,
	MIN_OPERATION_COUNT,
	MIN_CALCULATION_YEAR,
	MAX_CALCULATION_YEAR,
	HIVE_TRANSACTION_FEE_USD
} from './constants';
import { getFeeHistoryForBlockchain, getFeeForYear } from './feeMatrix';

/**
 * Validates fee calculation input parameters
 * @param input - The calculation input to validate
 * @throws Error if validation fails with descriptive message
 */
function validateCalculationInput(input: FeeCalculationInput): void {
	if (input.totalOperations < MIN_OPERATION_COUNT) {
		throw new Error(
			`[FeeCalculator Validation Error] Total operations must be at least ${MIN_OPERATION_COUNT}, received: ${input.totalOperations}`
		);
	}

	if (input.startYear < MIN_CALCULATION_YEAR || input.startYear > MAX_CALCULATION_YEAR) {
		throw new Error(
			`[FeeCalculator Validation Error] Start year must be between ${MIN_CALCULATION_YEAR} and ${MAX_CALCULATION_YEAR}, received: ${input.startYear}`
		);
	}

	if (input.endYear < MIN_CALCULATION_YEAR || input.endYear > MAX_CALCULATION_YEAR) {
		throw new Error(
			`[FeeCalculator Validation Error] End year must be between ${MIN_CALCULATION_YEAR} and ${MAX_CALCULATION_YEAR}, received: ${input.endYear}`
		);
	}

	if (input.startYear > input.endYear) {
		throw new Error(
			`[FeeCalculator Validation Error] Start year (${input.startYear}) cannot be after end year (${input.endYear})`
		);
	}
}

/**
 * Calculates the number of years in the calculation period
 * @param startYear - First year
 * @param endYear - Last year
 * @returns Number of years (inclusive)
 */
function calculateYearRange(startYear: number, endYear: number): number {
	return endYear - startYear + 1;
}

/**
 * Distributes total operations evenly across years
 * @param totalOperations - Total number of operations
 * @param yearCount - Number of years to distribute across
 * @returns Operations per year (evenly distributed)
 */
function distributeOperationsAcrossYears(
	totalOperations: number,
	yearCount: number
): number {
	return totalOperations / yearCount;
}

/**
 * Generates array of years in the calculation range
 * @param startYear - First year
 * @param endYear - Last year
 * @returns Array of years in chronological order
 */
function generateYearRange(
	startYear: FeeCalculationYear,
	endYear: FeeCalculationYear
): FeeCalculationYear[] {
	const years: FeeCalculationYear[] = [];
	for (let year = startYear; year <= endYear; year++) {
		years.push(year as FeeCalculationYear);
	}
	return years;
}

/**
 * Calculates fee breakdown for a single blockchain over multiple years
 * @param blockchain - The blockchain network
 * @param operationsPerYear - Number of operations per year
 * @param years - Array of years to calculate
 * @returns Complete fee calculation with yearly breakdown
 */
function calculateBlockchainFees(
	blockchain: BlockchainNetwork,
	operationsPerYear: number,
	years: FeeCalculationYear[]
): BlockchainFeeCalculation {
	const yearlyBreakdown: YearlyFeeBreakdown[] = [];
	let totalFeeUsd = 0;

	for (const year of years) {
		const averageFeeUsd = getFeeForYear(blockchain, year);

		if (averageFeeUsd === undefined) {
			throw new Error(
				`[FeeCalculator Data Error] No fee data found for ${blockchain} in year ${year}`
			);
		}

		const yearlyTotalFee = operationsPerYear * averageFeeUsd;
		totalFeeUsd += yearlyTotalFee;

		yearlyBreakdown.push({
			year,
			operationCount: operationsPerYear,
			averageFeeUsd,
			totalFeeUsd: yearlyTotalFee
		});
	}

	return {
		blockchain,
		totalFeeUsd,
		yearlyBreakdown
	};
}

/**
 * Calculates savings by using Hive (zero fees) versus other blockchains
 * @param calculations - Fee calculations for all blockchains
 * @returns Map of blockchain to savings amount in USD
 */
function calculateHiveSavings(
	calculations: BlockchainFeeCalculation[]
): Record<string, number> {
	const savings: Record<string, number> = {};

	for (const calculation of calculations) {
		if (calculation.blockchain !== BlockchainNetwork.HIVE) {
			savings[calculation.blockchain] = calculation.totalFeeUsd - HIVE_TRANSACTION_FEE_USD;
		}
	}

	return savings;
}

/**
 * Main function: Calculates and compares transaction fees across all blockchains
 * @param input - Calculation parameters (operations, year range)
 * @returns Complete comparison result with all blockchain calculations
 * @throws Error if validation fails or data is missing
 */
export function calculateFeeComparison(input: FeeCalculationInput): FeeComparisonResult {
	validateCalculationInput(input);

	const yearCount = calculateYearRange(input.startYear, input.endYear);
	const operationsPerYear = distributeOperationsAcrossYears(input.totalOperations, yearCount);
	const years = generateYearRange(input.startYear, input.endYear);

	const calculations: BlockchainFeeCalculation[] = [];

	// Calculate fees for all comparable blockchains
	for (const blockchain of COMPARABLE_BLOCKCHAINS) {
		const calculation = calculateBlockchainFees(blockchain, operationsPerYear, years);
		calculations.push(calculation);
	}

	// Add Hive calculation (always zero fees)
	calculations.push(
		calculateBlockchainFees(BlockchainNetwork.HIVE, operationsPerYear, years)
	);

	const hiveSavings = calculateHiveSavings(calculations);

	return {
		totalOperations: input.totalOperations,
		calculationPeriod: {
			startYear: input.startYear,
			endYear: input.endYear
		},
		calculations,
		hiveSavings
	};
}

/**
 * Convenience function: Calculate fees for default period (2020-2024)
 * @param totalOperations - Total number of operations
 * @returns Fee comparison result for 2020-2024 period
 */
export function calculateFeeComparisonDefault(totalOperations: number): FeeComparisonResult {
	return calculateFeeComparison({
		totalOperations,
		startYear: 2020,
		endYear: 2024
	});
}
