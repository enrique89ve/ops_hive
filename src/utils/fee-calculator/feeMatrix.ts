import type { FeeMatrix, YearlyFeeData } from './types';
import { BlockchainNetwork } from './types';

/**
 * Bitcoin fee history (2020-2025)
 * Source: Historical average transaction fees in USD
 */
const BITCOIN_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 1.0 },
	{ year: 2021, averageFeeUsd: 20.0 },
	{ year: 2022, averageFeeUsd: 1.9 },
	{ year: 2023, averageFeeUsd: 2.5 },
	{ year: 2024, averageFeeUsd: 7.0 },
	{ year: 2025, averageFeeUsd: 0.62 }
] as const;

/**
 * Ethereum fee history (2020-2025)
 * Source: Historical average gas fees in USD
 */
const ETHEREUM_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 0.15 },
	{ year: 2021, averageFeeUsd: 20.0 },
	{ year: 2022, averageFeeUsd: 2.5 },
	{ year: 2023, averageFeeUsd: 4.0 },
	{ year: 2024, averageFeeUsd: 2.0 },
	{ year: 2025, averageFeeUsd: 1.8 }
] as const;

/**
 * Solana fee history (2020-2025)
 * Source: Historical average transaction fees in USD
 */
const SOLANA_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 0.00025 },
	{ year: 2021, averageFeeUsd: 0.00025 },
	{ year: 2022, averageFeeUsd: 0.00025 },
	{ year: 2023, averageFeeUsd: 0.00020 },
	{ year: 2024, averageFeeUsd: 0.00030 },
	{ year: 2025, averageFeeUsd: 0.00093 }
] as const;

/**
 * BNB Chain fee history (2020-2025)
 * Source: Historical average transaction fees in USD
 */
const BNB_CHAIN_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 0.05 },
	{ year: 2021, averageFeeUsd: 0.50 },
	{ year: 2022, averageFeeUsd: 0.30 },
	{ year: 2023, averageFeeUsd: 0.15 },
	{ year: 2024, averageFeeUsd: 0.10 },
	{ year: 2025, averageFeeUsd: 0.08 }
] as const;

/**
 * Polkadot fee history (2020-2025)
 * Source: Historical average transaction fees in USD
 */
const POLKADOT_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 0.03 },
	{ year: 2021, averageFeeUsd: 0.10 },
	{ year: 2022, averageFeeUsd: 0.05 },
	{ year: 2023, averageFeeUsd: 0.03 },
	{ year: 2024, averageFeeUsd: 0.04 },
	{ year: 2025, averageFeeUsd: 0.03 }
] as const;

/**
 * Hive fee history (2020-2025)
 * Hive has zero transaction fees (feeless blockchain)
 */
const HIVE_FEE_HISTORY: readonly YearlyFeeData[] = [
	{ year: 2020, averageFeeUsd: 0 },
	{ year: 2021, averageFeeUsd: 0 },
	{ year: 2022, averageFeeUsd: 0 },
	{ year: 2023, averageFeeUsd: 0 },
	{ year: 2024, averageFeeUsd: 0 },
	{ year: 2025, averageFeeUsd: 0 }
] as const;

/**
 * Complete fee matrix mapping all blockchains to their fee histories
 * Immutable data structure for thread-safety and predictability
 */
export const BLOCKCHAIN_FEE_MATRIX: FeeMatrix = new Map<BlockchainNetwork, readonly YearlyFeeData[]>([
	[BlockchainNetwork.BITCOIN, BITCOIN_FEE_HISTORY],
	[BlockchainNetwork.ETHEREUM, ETHEREUM_FEE_HISTORY],
	[BlockchainNetwork.SOLANA, SOLANA_FEE_HISTORY],
	[BlockchainNetwork.BNB_CHAIN, BNB_CHAIN_FEE_HISTORY],
	[BlockchainNetwork.POLKADOT, POLKADOT_FEE_HISTORY],
	[BlockchainNetwork.HIVE, HIVE_FEE_HISTORY]
]);

/**
 * Retrieves fee history for a specific blockchain
 * @param blockchain - The blockchain network to query
 * @returns Readonly array of yearly fee data, or undefined if blockchain not found
 */
export function getFeeHistoryForBlockchain(
	blockchain: BlockchainNetwork
): readonly YearlyFeeData[] | undefined {
	return BLOCKCHAIN_FEE_MATRIX.get(blockchain);
}

/**
 * Retrieves fee for a specific blockchain and year
 * @param blockchain - The blockchain network
 * @param year - The calendar year
 * @returns The average fee in USD, or undefined if not found
 */
export function getFeeForYear(
	blockchain: BlockchainNetwork,
	year: number
): number | undefined {
	const feeHistory = getFeeHistoryForBlockchain(blockchain);
	if (!feeHistory) return undefined;

	const yearData = feeHistory.find(data => data.year === year);
	return yearData?.averageFeeUsd;
}
