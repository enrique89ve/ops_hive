const MAIN_API = 'https://api.syncad.com';
const FALLBACK_API = 'https://api.hive.blog';

interface FetchOptions {
	timeout?: number;
}

async function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
	const { timeout = 10000 } = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, { signal: controller.signal });
		clearTimeout(timeoutId);
		return response;
	} catch (error) {
		clearTimeout(timeoutId);
		throw error;
	}
}

export async function fetchFromHiveAPI(endpoint: string, options: FetchOptions = {}): Promise<any> {
	const mainUrl = `${MAIN_API}${endpoint}`;
	const fallbackUrl = `${FALLBACK_API}${endpoint}`;

	try {
		const response = await fetchWithTimeout(mainUrl, options);

		if (!response.ok) {
			throw new Error(`Main API failed: ${response.status}`);
		}

		return await response.json();
	} catch (mainError) {
		console.warn('Main API failed, trying fallback:', mainError);

		try {
			const response = await fetchWithTimeout(fallbackUrl, options);

			if (!response.ok) {
				throw new Error(`Fallback API failed: ${response.status}`);
			}

			return await response.json();
		} catch (fallbackError) {
			console.error('Both APIs failed:', fallbackError);
			throw new Error('Unable to connect to Hive API');
		}
	}
}

export interface TransactionStatistics {
	date: string;
	trx_count: number;
	avg_trx: number;
	min_trx: number;
	max_trx: number;
	last_block_num: number;
}

export async function getGlobalTransactionStats(): Promise<TransactionStatistics[]> {
	return fetchFromHiveAPI('/hafbe-api/transaction-statistics?granularity=yearly&direction=desc&from-block=1');
}

export interface UserOperationsResponse {
	total_operations: number;
	total_pages: number;
	block_range: {
		from: number;
		to: number;
	};
	operations_result: any[];
}

export async function getUserOperations(username: string): Promise<UserOperationsResponse> {
	return fetchFromHiveAPI(`/hafah-api/accounts/${username}/operations?participation-mode=all&page-size=100&data-size-limit=200000`);
}
