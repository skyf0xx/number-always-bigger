import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function adjustDecimalString(value: string, decimals: number): string {
    // Remove any existing decimal points and leading zeros
    const cleanValue = value.replace(/[.,]/g, '').replace(/^0+/, '');

    // If the number is too short, pad with leading zeros
    const paddedValue = cleanValue.padStart(decimals + 1, '0');

    // Find the position to insert the decimal point
    const insertPosition = paddedValue.length - decimals;

    // Insert the decimal point
    const result =
        paddedValue.slice(0, insertPosition) +
        '.' +
        paddedValue.slice(insertPosition);

    // Remove trailing zeros after decimal and unnecessary decimal point
    return result.replace(/\.?0+$/, '');
}

export const formatBalance = (amount: string) => {
    const num = parseFloat(amount);

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20, // Using 20 as it's the maximum supported
        useGrouping: true,
    }).format(num);
};

// Retry configuration type
interface RetryConfig {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
    backoffFactor: number;
}

// Default retry configuration
const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxAttempts: 5,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2,
};

/**
 * Implements exponential backoff retry logic for async functions
 * @param operation Function to retry
 * @param config Retry configuration
 * @returns Result of the operation
 * @throws Last error encountered after all retries are exhausted
 */
async function withRetry<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {}
): Promise<T> {
    const fullConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    let lastError: Error | undefined;
    let delay = fullConfig.initialDelay;

    for (let attempt = 1; attempt <= fullConfig.maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error as Error;

            // If this was the last attempt, throw the error
            if (attempt === fullConfig.maxAttempts) {
                throw new Error(
                    `Failed after ${attempt} attempts. Last error: ${lastError.message}`
                );
            }

            // Calculate next delay with exponential backoff
            delay = Math.min(
                delay * fullConfig.backoffFactor,
                fullConfig.maxDelay
            );

            // Wait before next attempt
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    // This should never be reached due to the throw above, but TypeScript needs it
    throw lastError;
}

export { withRetry, type RetryConfig };
