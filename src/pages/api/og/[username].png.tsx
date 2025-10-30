import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const { username } = params;

	if (!username) {
		return new Response("Username is required", { status: 400 });
	}

	try {
		// Fetch user stats
		const userResponse = await fetch(
			`https://api.syncad.com/hafah-api/accounts/${username}/operations?participation-mode=all&page-size=100&data-size-limit=200000`
		);

		if (!userResponse.ok) {
			return new Response("User not found", { status: 404 });
		}

		const userData = await userResponse.json();
		const userTotal = userData.total_operations;

		// Fetch global stats
		const globalResponse = await fetch(
			"https://api.syncad.com/hafbe-api/transaction-statistics?granularity=yearly&direction=desc&from-block=1"
		);
		const globalStats = await globalResponse.json();
		const globalTotal = globalStats.reduce(
			(sum: number, year: { trx_count: number }) => sum + year.trx_count,
			0
		);

		const percentage = (userTotal / globalTotal) * 100;
		const billions = (globalTotal / 1_000_000_000).toFixed(2);

		// Get avatar URL
		const avatarUrl = `https://images.hive.blog/u/${username}/avatar/medium`;

		// Hive logo SVG (simplified)
		const hiveLogo = `<svg width="120" height="30" viewBox="0 0 835 190" xmlns="http://www.w3.org/2000/svg"><g fill="#e31337"><path d="M157.273 107.264c.726 0 1.18.787.816 1.417l-46.75 80.848c-.168.291-.479.471-.816.471H81.944c-.726 0-1.18-.788-.816-1.417l46.75-80.848c.169-.292.48-.471.817-.471zm-27.795-23.174c-.337 0-.648-.18-.816-.471L81.128 1.417C80.764.787 81.218 0 81.944 0h28.578c.337 0 .648.18.816.471l47.533 82.202c.364.63-.09 1.417-.816 1.417z"/><path d="M135.128 1.416C134.764.787 135.22 0 135.947 0h28.62c.337 0 .649.18.818.472l54.487 94.056c.17.292.17.652 0 .944l-54.488 94.056c-.169.292-.48.472-.818.472h-28.62c-.728 0-1.183-.787-.818-1.416L189.343 95zm-23.258 93.108c.172.292.173.654.002.948L57.125 189.528c-.365.627-1.277.63-1.646.004L.13 95.476c-.173-.293-.173-.655-.003-.948L54.875.472c.365-.628 1.277-.63 1.646-.004z"/></g></svg>`;

		// Generate image
		return new ImageResponse(
			(
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#000000",
						position: "relative",
						padding: "40px",
					}}
				>
					{/* Gradient overlay */}
					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(to bottom right, transparent, rgba(227, 19, 55, 0.1), transparent)",
						}}
					/>

					{/* Content */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							border: "2px solid rgba(227, 19, 55, 0.3)",
							padding: "30px 50px",
							position: "relative",
							zIndex: 10,
							width: "100%",
							height: "100%",
						}}
					>
						{/* Main content row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								gap: "50px",
							}}
						>
							{/* Left side - Avatar & Username */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "12px",
								}}
							>
								<img
									src={avatarUrl}
									width="80"
									height="80"
									style={{
										borderRadius: "50%",
										border: "2px solid rgba(227, 19, 55, 0.3)",
									}}
								/>
								<h2
									style={{
										fontSize: "28px",
										fontWeight: 900,
										color: "#ffffff",
										margin: 0,
									}}
								>
									@{username}
								</h2>
							</div>

							{/* Vertical divider */}
							<div
								style={{
									width: "1px",
									height: "100%",
									background:
										"linear-gradient(to bottom, transparent, rgba(227, 19, 55, 0.3), transparent)",
								}}
							/>

							{/* Right side - Stats */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "20px",
									flex: 1,
								}}
							>
								{/* User Operations */}
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "6px",
									}}
								>
									<p
										style={{
											fontSize: "16px",
											color: "rgba(255, 255, 255, 0.8)",
											margin: 0,
										}}
									>
										Total operations on Hive:
									</p>
									<p
										style={{
											fontSize: "38px",
											fontWeight: 900,
											color: "#e31337",
											margin: 0,
										}}
									>
										{userTotal.toLocaleString("en-US")}
									</p>
								</div>

								{/* Divider */}
								<div
									style={{
										width: "100%",
										height: "1px",
										background: "rgba(227, 19, 55, 0.2)",
									}}
								/>

								{/* Percentage & Global */}
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "6px",
										}}
									>
										<p
											style={{
												fontSize: "14px",
												color: "rgba(255, 255, 255, 0.7)",
												margin: 0,
											}}
										>
											Among the top
										</p>
										<p
											style={{
												fontSize: "32px",
												fontWeight: 900,
												color: "#e31337",
												margin: 0,
											}}
										>
											{percentage.toFixed(6)}%
										</p>
										<p
											style={{
												fontSize: "12px",
												color: "rgba(255, 255, 255, 0.6)",
												margin: 0,
											}}
										>
											most active
										</p>
									</div>

									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "flex-end",
											gap: "6px",
										}}
									>
										<p
											style={{
												fontSize: "14px",
												color: "rgba(255, 255, 255, 0.7)",
												margin: 0,
											}}
										>
											Hive surpassed
										</p>
										<p
											style={{
												fontSize: "32px",
												fontWeight: 900,
												color: "#e31337",
												margin: 0,
											}}
										>
											{billions}B
										</p>
										<p
											style={{
												fontSize: "12px",
												color: "rgba(255, 255, 255, 0.6)",
												margin: 0,
											}}
										>
											operations
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Logo at bottom */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginTop: "20px",
							}}
						>
							<svg
								width="120"
								height="30"
								viewBox="0 0 835 190"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="#e31337">
									<path d="M157.273 107.264c.726 0 1.18.787.816 1.417l-46.75 80.848c-.168.291-.479.471-.816.471H81.944c-.726 0-1.18-.788-.816-1.417l46.75-80.848c.169-.292.48-.471.817-.471zm-27.795-23.174c-.337 0-.648-.18-.816-.471L81.128 1.417C80.764.787 81.218 0 81.944 0h28.578c.337 0 .648.18.816.471l47.533 82.202c.364.63-.09 1.417-.816 1.417z" />
									<path d="M135.128 1.416C134.764.787 135.22 0 135.947 0h28.62c.337 0 .649.18.818.472l54.487 94.056c.17.292.17.652 0 .944l-54.488 94.056c-.169.292-.48.472-.818.472h-28.62c-.728 0-1.183-.787-.818-1.416L189.343 95zm-23.258 93.108c.172.292.173.654.002.948L57.125 189.528c-.365.627-1.277.63-1.646.004L.13 95.476c-.173-.293-.173-.655-.003-.948L54.875.472c.365-.628 1.277-.63 1.646-.004z" />
								</g>
								<path
									fill="#ffffff"
									d="M371.508 36h31.601v116.799h-31.601V107.247h-44.907v45.551H295V36h31.601v42.214h44.907zm98.13 0h31.185v116.799h-31.185zM602.71 152.799L556.956 37.502V36h34.274l28.617 79.256L648.464 36h34.273v1.502l-45.747 115.297zm166.79-28.699h65.005v28.699h-95.669V36h95.508v28.699h-63.838v16.185h40.503v26.697h-40.503z"
								/>
							</svg>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		);
	} catch (error) {
		console.error("Error generating OG image:", error);
		return new Response("Error generating image", { status: 500 });
	}
};
