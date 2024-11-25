import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { ArrowDownCircle, ArrowUpCircle, Timer, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    getAllowedTokens,
    stakeToken,
    StakedBalances,
    AllowedTokens,
} from '@/lib/wallet-actions';

interface StakerProps {
    walletAddress: string;
    onStakeComplete?: () => void;
    stakedBalances?: StakedBalances;
}

const Staker = ({
    walletAddress,
    onStakeComplete,
    stakedBalances = [],
}: StakerProps) => {
    const [unstakeInput, setUnstakeInput] = useState('');
    const [stakeInput, setStakeInput] = useState('');
    const [selectedToken, setSelectedToken] = useState('');
    const [allowedTokens, setAllowedTokens] = useState<AllowedTokens>({
        addresses: {},
        names: {},
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch allowed tokens on component mount
    useEffect(() => {
        const fetchAllowedTokens = async () => {
            try {
                setIsLoading(true);
                const tokens = await getAllowedTokens();
                setAllowedTokens(tokens);

                // Set first token as default selected if available
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

    // Handle stake function
    const handleStake = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);

        if (!selectedToken) {
            setError('please select a token to stake');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError('please enter a valid amount fren');
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);

            const result = await stakeToken(amount, selectedToken);
            if (!result) {
                throw new Error('Staking failed');
            }

            setStakeInput('');
            if (onStakeComplete) {
                onStakeComplete();
            }
        } catch (err) {
            setError('oopsie! something went wrong while staking');
            console.error('Staking error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle unstake function
    const handleUnstake = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(unstakeInput);

        if (!selectedToken) {
            setError('please select a token to unstake');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError('please enter a valid amount fren');
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);

            // TODO: Implement actual unstaking logic here
            // This would involve calling your contract functions

            setUnstakeInput('');
            if (onStakeComplete) {
                onStakeComplete();
            }
        } catch (err) {
            setError('oopsie! something went wrong while unstaking');
            console.error('Unstaking error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <RefreshCw className="animate-spin mr-2" />
                <span className="font-comic">loading available tokens...</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {error && (
                <Alert className="bg-red-50 border-red-400">
                    <AlertTitle className="font-comic">oopsie!</AlertTitle>
                    <AlertDescription className="font-comic">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {/* Token Selection */}
            <div className="mb-4">
                <label className="block text-sm font-comic mb-2">
                    select token to stake:
                </label>
                <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full p-3 rounded-lg border-2 border-meme-blue font-comic focus:outline-none focus:ring-2 focus:ring-meme-blue bg-white"
                    disabled={isProcessing}
                >
                    <option value="">choose a token fren</option>
                    {Object.entries(allowedTokens.names).map(([key, name]) => (
                        <option key={key} value={allowedTokens.addresses[key]}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stake Form */}
            <form onSubmit={handleStake} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={stakeInput}
                        onChange={(e) => setStakeInput(e.target.value)}
                        placeholder="enter amount to stake"
                        className="flex-1 p-3 rounded-lg border-2 border-crypto-green font-comic focus:outline-none focus:ring-2 focus:ring-crypto-green"
                        disabled={isProcessing}
                    />
                    <button
                        type="submit"
                        className="bg-crypto-green text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                            isProcessing || !walletAddress || !selectedToken
                        }
                    >
                        <ArrowUpCircle className="h-5 w-5" />
                        {isProcessing ? 'processing...' : 'stake'}
                    </button>
                </div>
            </form>

            {/* Unstake Form */}
            <form onSubmit={handleUnstake} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={unstakeInput}
                        onChange={(e) => setUnstakeInput(e.target.value)}
                        placeholder="enter amount to unstake"
                        className="flex-1 p-3 rounded-lg border-2 border-floor-pink font-comic focus:outline-none focus:ring-2 focus:ring-floor-pink"
                        disabled={isProcessing}
                    />
                    <button
                        type="submit"
                        className="bg-floor-pink text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                            isProcessing || !walletAddress || !selectedToken
                        }
                    >
                        <ArrowDownCircle className="h-5 w-5" />
                        {isProcessing ? 'processing...' : 'unstake'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Staker;
