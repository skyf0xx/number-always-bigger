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
