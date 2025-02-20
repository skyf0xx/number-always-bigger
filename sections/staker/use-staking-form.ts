import { useState } from 'react';
import { stakeToken, TokenBalance, unstakeToken } from '@/lib/wallet-actions';

const useStakingForm = (
    onStakeComplete?: () => void,
    getTokenName?: (address: string) => string
) => {
    const [stakeInput, setStakeInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [inputTouched, setInputTouched] = useState(false);

    const validateInput = (
        value: string,
        tokenBalance?: TokenBalance | null
    ): string | null => {
        if (!value) return null;
        const amount = parseFloat(value);
        if (isNaN(amount)) return "that's not a number fren";
        if (amount <= 0) return "can't stake zero or negative numbers";
        if (tokenBalance && Number(tokenBalance.balance) < amount) {
            return "you don't have that much fren";
        }
        return null;
    };

    const handleInputChange = (value: string) => {
        const normalizedValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '');
        const parts = normalizedValue.split('.');
        const formattedValue =
            parts.length > 1 ? `${parts[0]}.${parts[1]}` : normalizedValue;

        setStakeInput(formattedValue);
        setInputTouched(true);
        setError(null);
    };

    const handleStake = async (
        selectedToken: string,
        tokenBalance: TokenBalance | null
    ) => {
        const amount = parseFloat(stakeInput);
        const validationError = validateInput(stakeInput, tokenBalance);

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);
            setSuccess(null);

            const result = await stakeToken(amount, selectedToken);

            if (result !== true) {
                throw new Error(result);
            }

            setSuccess(
                `successfully staked ${amount} ${getTokenName?.(
                    selectedToken
                )} - refreshing`
            );
            setStakeInput('');
            setInputTouched(false);

            if (onStakeComplete) {
                setTimeout(onStakeComplete, 3000);
            }
        } catch (err: any) {
            setError(
                err?.message || 'oopsie! something went wrong while staking'
            );
            console.error('Staking error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUnstake = async (selectedToken: string) => {
        try {
            setIsProcessing(true);
            setError(null);
            setSuccess(null);

            const result = await unstakeToken(selectedToken);

            // Check if result is a string (error message) or true (success)
            if (result !== true) {
                throw new Error(result);
            }

            setSuccess(
                `successfully unstaked your ${getTokenName?.(selectedToken)}`
            );
            if (onStakeComplete) {
                onStakeComplete();
            }
        } catch (err: any) {
            // Handle the error message directly if it comes from unstakeToken
            setError(
                err?.message || 'oopsie! something went wrong while unstaking'
            );
            console.error('Unstaking error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        stakeInput,
        setStakeInput,
        isProcessing,
        error,
        success,
        inputTouched,
        setInputTouched,
        handleInputChange,
        handleStake,
        handleUnstake,
        validateInput,
    };
};

export default useStakingForm;
