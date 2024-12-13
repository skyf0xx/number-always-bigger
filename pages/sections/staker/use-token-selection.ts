import { useState, useEffect } from 'react';
import { AllowedTokens, TokenBalance } from './types';
import { getAllowedTokens, getBalance } from '@/lib/wallet-actions';

export const useTokenSelection = (walletAddress: string) => {
    const [selectedToken, setSelectedToken] = useState('');
    const [allowedTokens, setAllowedTokens] = useState<AllowedTokens>({
        addresses: {},
        names: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);

    // Fetch allowed tokens on mount
    useEffect(() => {
        const fetchAllowedTokens = async () => {
            try {
                setIsLoading(true);
                const tokens = await getAllowedTokens();
                setAllowedTokens(tokens);
                const firstTokenKey = Object.keys(tokens.addresses)[0];
                if (firstTokenKey) {
                    setSelectedToken(tokens.addresses[firstTokenKey]);
                }
            } catch (err) {
                setError('Failed to fetch allowed tokens');
                console.error('Error fetching tokens:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllowedTokens();
    }, []);

    // Fetch token balance when selected token changes
    useEffect(() => {
        const fetchTokenBalance = async () => {
            if (!selectedToken || !walletAddress) {
                setTokenBalance(null);
                return;
            }

            try {
                setIsLoadingBalance(true);
                const balance = await getBalance(walletAddress, selectedToken);
                setTokenBalance(balance);
            } catch (err) {
                console.error('Error fetching token balance:', err);
                setTokenBalance(null);
            } finally {
                setIsLoadingBalance(false);
            }
        };

        fetchTokenBalance();
    }, [selectedToken, walletAddress]);

    const getTokenName = (address: string): string => {
        const tokenKey = Object.entries(allowedTokens.addresses).find(
            ([_, addr]) => addr === address
        )?.[0];
        return tokenKey ? allowedTokens.names[tokenKey] : address;
    };

    return {
        selectedToken,
        setSelectedToken,
        allowedTokens,
        isLoading,
        error,
        tokenBalance,
        isLoadingBalance,
        getTokenName,
    };
};
