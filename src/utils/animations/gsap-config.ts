/**
 * GSAP Animation Configuration
 * Centralized animation settings for consistent UI behavior
 */

export const ANIMATION_CONFIG = {
	// Duration settings
	duration: {
		fast: 0.3,
		normal: 0.5,
		slow: 0.8,
		verySlow: 1.2,
	},

	// Easing presets
	ease: {
		smooth: 'power2.out',
		bounce: 'back.out(1.7)',
		elastic: 'elastic.out(1, 0.5)',
		expo: 'expo.out',
		default: 'power2.inOut',
	},

	// Counter animation defaults
	counter: {
		duration: 2,
		ease: 'power2.out',
		decimals: 0,
	},

	// Stagger timing for sequential animations
	stagger: {
		fast: 0.05,
		normal: 0.1,
		slow: 0.15,
	},
} as const;

export type AnimationConfig = typeof ANIMATION_CONFIG;
