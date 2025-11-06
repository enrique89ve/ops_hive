/**
 * Base error class for application-specific errors
 */
export abstract class AppError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * API-related errors
 */
export class ApiError extends AppError {
	constructor(
		message: string,
		public readonly statusCode?: number,
		context?: Record<string, unknown>
	) {
		super(message, context);
	}
}

/**
 * Cache-related errors
 */
export class CacheError extends AppError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, context);
	}
}

/**
 * DOM manipulation errors
 */
export class DomError extends AppError {
	constructor(
		message: string,
		public readonly elementId?: string,
		context?: Record<string, unknown>
	) {
		super(message, { ...context, elementId });
	}
}

/**
 * Image capture errors
 */
export class ImageCaptureError extends AppError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, context);
	}
}

/**
 * User validation errors
 */
export class ValidationError extends AppError {
	constructor(
		message: string,
		public readonly field?: string,
		context?: Record<string, unknown>
	) {
		super(message, { ...context, field });
	}
}

/**
 * Type guard for AppError instances
 */
export function isAppError(error: unknown): error is AppError {
	return error instanceof AppError;
}

/**
 * Extracts safe error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	return 'An unknown error occurred';
}

/**
 * Logs error with context
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
	if (isAppError(error)) {
		console.error(
			`[${error.name}]`,
			error.message,
			{ ...error.context, ...context }
		);
	} else {
		console.error('[Error]', getErrorMessage(error), context);
	}
}
