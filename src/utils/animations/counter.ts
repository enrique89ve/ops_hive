import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from './gsap-config';

interface CounterOptions {
	duration?: number;
	ease?: string;
	decimals?: number;
	onUpdate?: (value: number) => void;
	onComplete?: () => void;
}

/**
 * Animates a number from 0 to target value
 * @param target - The final number to count to
 * @param options - Animation configuration options
 * @returns GSAP Tween instance for control
 */
export function animateCounter(
	target: number,
	options: CounterOptions = {}
): gsap.core.Tween {
	const {
		duration = ANIMATION_CONFIG.counter.duration,
		ease = ANIMATION_CONFIG.counter.ease,
		decimals = ANIMATION_CONFIG.counter.decimals,
		onUpdate,
		onComplete,
	} = options;

	const counter = { value: 0 };

	return gsap.to(counter, {
		value: target,
		duration,
		ease,
		onUpdate: () => {
			const currentValue = decimals > 0
				? counter.value.toFixed(decimals)
				: Math.floor(counter.value);

			if (onUpdate) {
				onUpdate(Number(currentValue));
			}
		},
		onComplete,
	});
}

/**
 * Formats large numbers with commas
 * @param num - Number to format
 * @returns Formatted string with thousand separators
 */
export function formatNumber(num: number): string {
	return Math.floor(num).toLocaleString('en-US');
}

/**
 * Animates a counter in a DOM element
 * @param element - HTML element to update
 * @param target - Target number
 * @param options - Animation options
 */
export function animateCounterInElement(
	element: HTMLElement,
	target: number,
	options: CounterOptions = {}
): gsap.core.Tween {
	return animateCounter(target, {
		...options,
		onUpdate: (value) => {
			element.textContent = formatNumber(value);
			options.onUpdate?.(value);
		},
	});
}
