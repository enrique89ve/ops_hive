import type { FormattedFeeComparison } from '@/utils/fee-calculator';

/**
 * Base interface for all cached data
 */
export interface CacheEntry<T> {
	readonly data: T;
	readonly timestamp: number;
	readonly version: number;
}

/**
 * Cache key registry - eliminates magic strings
 */
export enum CacheKey {
	USER_STATS = 'hive_user_stats_cache',
	FEE_COMPARISON = 'hive_fee_comparison_cache',
	GLOBAL_STATS = 'hive_global_stats_cache'
}

/**
 * User statistics cache data structure
 */
export interface UserStatsCacheData {
	readonly username: string;
	readonly userTotal: number;
	readonly globalTotal: number;
	readonly percentage: number;
}

/**
 * Fee comparison cache data structure
 */
export interface FeeComparisonCacheData {
	readonly username: string;
	readonly totalOperations: number;
	readonly comparisonResults: FormattedFeeComparison[];
	readonly totalSavingsFormatted: string;
}

/**
 * Cache configuration constants
 */
export const CACHE_CONFIG = {
	DURATION_MS: 5 * 60 * 1000, // 5 minutes
	CURRENT_VERSION: 1
} as const;
