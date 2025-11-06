import { CacheEntry, CacheKey, CACHE_CONFIG } from './types';

/**
 * Type-safe localStorage cache manager
 */
export class CacheStorage {
	/**
	 * Retrieves cached data if valid and not expired
	 */
	static get<T>(key: CacheKey): T | null {
		try {
			const cached = localStorage.getItem(key);
			if (!cached) {
				return null;
			}

			const entry: CacheEntry<T> = JSON.parse(cached);

			// Validate cache structure
			if (!this.isValidCacheEntry(entry)) {
				console.warn(`[Cache] Invalid cache structure for key: ${key}`);
				this.remove(key);
				return null;
			}

			// Check version compatibility
			if (entry.version !== CACHE_CONFIG.CURRENT_VERSION) {
				console.info(`[Cache] Version mismatch for key: ${key}. Clearing cache.`);
				this.remove(key);
				return null;
			}

			// Check expiration
			const now = Date.now();
			if (now - entry.timestamp >= CACHE_CONFIG.DURATION_MS) {
				console.info(`[Cache] Expired cache for key: ${key}`);
				this.remove(key);
				return null;
			}

			return entry.data;
		} catch (error) {
			console.error(`[Cache Error] Failed to retrieve cache for key: ${key}`, error);
			this.remove(key);
			return null;
		}
	}

	/**
	 * Stores data in cache with timestamp and version
	 */
	static set<T>(key: CacheKey, data: T): boolean {
		try {
			const entry: CacheEntry<T> = {
				data,
				timestamp: Date.now(),
				version: CACHE_CONFIG.CURRENT_VERSION
			};

			localStorage.setItem(key, JSON.stringify(entry));
			return true;
		} catch (error) {
			console.error(`[Cache Error] Failed to store cache for key: ${key}`, error);
			return false;
		}
	}

	/**
	 * Removes specific cache entry
	 */
	static remove(key: CacheKey): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(`[Cache Error] Failed to remove cache for key: ${key}`, error);
		}
	}

	/**
	 * Clears all application caches
	 */
	static clearAll(): void {
		Object.values(CacheKey).forEach(key => this.remove(key));
	}

	/**
	 * Validates cache entry structure at runtime
	 */
	private static isValidCacheEntry<T>(entry: unknown): entry is CacheEntry<T> {
		return (
			typeof entry === 'object' &&
			entry !== null &&
			'data' in entry &&
			'timestamp' in entry &&
			'version' in entry &&
			typeof (entry as any).timestamp === 'number' &&
			typeof (entry as any).version === 'number'
		);
	}
}
