import html2canvas from 'html2canvas';

interface ShareOptions {
	filename?: string;
	backgroundColor?: string;
	scale?: number;
}

/**
 * Captures a DOM element as an image and triggers download
 * @param element - The HTML element to capture
 * @param options - Capture and download options
 */
export async function captureAndShare(
	element: HTMLElement,
	options: ShareOptions = {}
): Promise<void> {
	const {
		filename = 'ops-hive-stats.png',
		backgroundColor = '#000000',
		scale = 2,
	} = options;

	try {
		const canvas = await html2canvas(element, {
			backgroundColor,
			scale,
			logging: false,
			useCORS: true,
		});

		// Convert canvas to blob
		const blob = await new Promise<Blob>((resolve) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
			}, 'image/png');
		});

		// Create download link
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();

		// Cleanup
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error capturing image:', error);
		throw error;
	}
}

/**
 * Sanitizes a username for use in filenames
 * @param username - The username to sanitize
 * @returns Safe filename string
 */
export function sanitizeFilename(username: string): string {
	return username.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
}

/**
 * Creates a descriptive filename for user stats
 * @param username - The username
 * @param prefix - Optional prefix (default: 'ops-hive')
 * @returns Formatted filename
 */
export function createStatsFilename(username: string, prefix = 'ops-hive'): string {
	const safe = sanitizeFilename(username);
	return `${prefix}-${safe}-stats.png`;
}
