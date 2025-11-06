import type { FeeCalculationYear } from './types';
import { BlockchainNetwork } from './types';

/**
 * Minimum valid year for fee calculations
 */
export const MIN_CALCULATION_YEAR: FeeCalculationYear = 2020;

/**
 * Maximum valid year for fee calculations
 */
export const MAX_CALCULATION_YEAR: FeeCalculationYear = 2025;

/**
 * All supported calculation years in chronological order
 */
export const VALID_CALCULATION_YEARS: readonly FeeCalculationYear[] = [
	2020, 2021, 2022, 2023, 2024, 2025
] as const;

/**
 * Human-readable display names for blockchain networks
 */
export const BLOCKCHAIN_DISPLAY_NAMES: Readonly<Record<BlockchainNetwork, string>> = {
	[BlockchainNetwork.BITCOIN]: 'Bitcoin',
	[BlockchainNetwork.ETHEREUM]: 'Ethereum',
	[BlockchainNetwork.SOLANA]: 'Solana',
	[BlockchainNetwork.BNB_CHAIN]: 'BNB Chain',
	[BlockchainNetwork.POLKADOT]: 'Polkadot',
	[BlockchainNetwork.HIVE]: 'Hive'
} as const;

/**
 * Blockchain ticker symbols
 */
export const BLOCKCHAIN_SYMBOLS: Readonly<Record<BlockchainNetwork, string>> = {
	[BlockchainNetwork.BITCOIN]: 'BTC',
	[BlockchainNetwork.ETHEREUM]: 'ETH',
	[BlockchainNetwork.SOLANA]: 'SOL',
	[BlockchainNetwork.BNB_CHAIN]: 'BNB',
	[BlockchainNetwork.POLKADOT]: 'DOT',
	[BlockchainNetwork.HIVE]: 'HIVE'
} as const;

/**
 * Currency formatting locale (US English)
 */
export const CURRENCY_LOCALE = 'en-US';

/**
 * Currency code for all fee calculations
 */
export const CURRENCY_CODE = 'USD';

/**
 * Default number of decimal places for currency formatting
 */
export const CURRENCY_DECIMAL_PLACES = 2;

/**
 * Hive blockchain transaction fee (always zero)
 */
export const HIVE_TRANSACTION_FEE_USD = 0;

/**
 * Minimum operation count for valid calculations
 */
export const MIN_OPERATION_COUNT = 1;

/**
 * Blockchains to include in comparison (excluding Hive)
 */
export const COMPARABLE_BLOCKCHAINS: readonly BlockchainNetwork[] = [
	BlockchainNetwork.BITCOIN,
	BlockchainNetwork.ETHEREUM,
	BlockchainNetwork.SOLANA,
	BlockchainNetwork.BNB_CHAIN,
	BlockchainNetwork.POLKADOT
] as const;
