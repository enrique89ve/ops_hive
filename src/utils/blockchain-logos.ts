import { BlockchainNetwork } from '@/utils/fee-calculator';

// Import SVG logos as URLs (Vite handles this optimization)
import bitcoinLogo from '@/assets/bitcoin-btc-logo.svg?url';
import ethereumLogo from '@/assets/ethereum-eth-logo.svg?url';
import solanaLogo from '@/assets/solana-sol-logo.svg?url';
import bnbLogo from '@/assets/bnb-bnb-logo.svg?url';
import polkadotLogo from '@/assets/polkadot-new-dot-logo.svg?url';

/**
 * Maps blockchain network enums to their corresponding logo URLs
 * SVG files are optimized by Vite and served as static assets
 */
export const BLOCKCHAIN_LOGOS: Readonly<Record<BlockchainNetwork, string>> = {
	[BlockchainNetwork.BITCOIN]: bitcoinLogo,
	[BlockchainNetwork.ETHEREUM]: ethereumLogo,
	[BlockchainNetwork.SOLANA]: solanaLogo,
	[BlockchainNetwork.BNB_CHAIN]: bnbLogo,
	[BlockchainNetwork.POLKADOT]: polkadotLogo,
	[BlockchainNetwork.HIVE]: '' // Hive doesn't need a logo in this context
} as const;

/**
 * Gets the logo URL for a specific blockchain
 * @param blockchain - The blockchain network identifier
 * @returns The optimized SVG logo URL
 */
export function getBlockchainLogo(blockchain: BlockchainNetwork): string {
	return BLOCKCHAIN_LOGOS[blockchain];
}

/**
 * Serializes blockchain logos to JSON for client-side usage
 * This allows passing the logo map to client-side scripts
 */
export function serializeBlockchainLogos(): string {
	return JSON.stringify(BLOCKCHAIN_LOGOS);
}
