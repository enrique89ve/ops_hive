/// <reference types="react" />

declare module "@vercel/og" {
	import type { ReactElement } from "react";

	interface ImageResponseOptions {
		width?: number;
		height?: number;
		emoji?: "twemoji" | "blobmoji" | "noto" | "openmoji" | "fluent" | "fluentFlat";
		fonts?: Array<{
			name: string;
			data: ArrayBuffer;
			weight?: number;
			style?: "normal" | "italic";
		}>;
		debug?: boolean;
		status?: number;
		statusText?: string;
		headers?: Record<string, string>;
	}

	export class ImageResponse extends Response {
		constructor(element: ReactElement, options?: ImageResponseOptions);
	}
}

// Declaración global para JSX con soporte limitado para Vercel OG
declare global {
	namespace JSX {
		interface IntrinsicElements {
			div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
			img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
			svg: React.SVGProps<SVGSVGElement>;
			g: React.SVGProps<SVGGElement>;
			path: React.SVGProps<SVGPathElement>;
			h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
			h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
			h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
			p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
			span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
		}

		interface Element extends React.ReactElement<any, any> {}
		interface ElementClass extends React.Component<any> {
			render(): React.ReactNode;
		}
		interface ElementAttributesProperty {
			props: {};
		}
		interface ElementChildrenAttribute {
			children: {};
		}
	}
}
