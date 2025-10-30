import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';

export const GET: APIRoute = async ({ params }) => {
	const { username } = params;

	// Fetch user stats from API
	const response = await fetch(
		`https://api.syncad.com/hafah-api/accounts/${username}/operations?participation-mode=all&page-size=100&data-size-limit=200000`
	);

	if (!response.ok) {
		return new Response('User not found', { status: 404 });
	}

	const data = await response.json();
	const totalOperations = data.total_operations || 0;

	// Create the OG image
	const html = {
		type: 'div',
		props: {
			style: {
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				backgroundColor: '#000000',
				color: '#ffffff',
				fontFamily: 'system-ui, -apple-system, sans-serif',
				padding: '80px',
				justifyContent: 'center',
				alignItems: 'center',
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: 72,
							fontWeight: 'bold',
							marginBottom: '40px',
						},
						children: `@${username}`,
					},
				},
				{
					type: 'div',
					props: {
						style: {
							fontSize: 120,
							fontWeight: 'bold',
							color: '#e31337',
							marginBottom: '20px',
						},
						children: totalOperations.toLocaleString(),
					},
				},
				{
					type: 'div',
					props: {
						style: {
							fontSize: 48,
							color: '#999999',
						},
						children: 'Total Operations',
					},
				},
			],
		},
	};

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
	});
};
