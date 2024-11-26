import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    RefreshCw,
    Wallet,
    Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    getAllowedTokens,
    stakeToken,
    unstakeToken,
    StakedBalances,
    AllowedTokens,
    getBalance,
    TokenBalance,
} from '@/lib/wallet-actions';
import RewardsDisplay from './rewards';
import { formatBalance } from '@/lib/utils';

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
    const [stakeInput, setStakeInput] = useState('');
    const [selectedToken, setSelectedToken] = useState('');
    const [allowedTokens, setAllowedTokens] = useState<AllowedTokens>({
        addresses: {},
        names: {},
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState<string | null>(null);
    const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const [inputTouched, setInputTouched] = useState(false);

    // Fetch allowed tokens on component mount
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
                // Reset input when token changes
                setStakeInput('');
                setInputTouched(false);
            } catch (err) {
                console.error('Error fetching token balance:', err);
                setTokenBalance(null);
            } finally {
                setIsLoadingBalance(false);
            }
        };

        fetchTokenBalance();
    }, [selectedToken, walletAddress]);

    // Get token name from address
    const getTokenName = (address: string): string => {
        const tokenKey = Object.entries(allowedTokens.addresses).find(
            ([_, addr]) => addr === address
        )?.[0];
        return tokenKey ? allowedTokens.names[tokenKey] : address;
    };

    // Handle max button click
    const handleMaxClick = () => {
        if (tokenBalance) {
            const maxAmount = formatBalance(tokenBalance.balance);
            setStakeInput(maxAmount);
            setInputTouched(true);
        }
    };

    // Validate input amount
    const validateInput = (value: string): string | null => {
        if (!value) return null;
        const amount = parseFloat(value);
        if (isNaN(amount)) return "that's not a number fren";
        if (amount <= 0) return "can't stake zero or negative numbers";
        if (tokenBalance && Number(tokenBalance.balance) < amount) {
            return "you don't have that much fren";
        }
        return null;
    };

    // Handle input change with validation
    const handleInputChange = (value: string) => {
        setStakeInput(value);
        setInputTouched(true);
        setError(null);
    };

    // Handle stake function
    const handleStake = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);
        const validationError = validateInput(stakeInput);

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);
            setSuccess(null);

            const result = await stakeToken(amount, selectedToken);

            if (result === false) {
                throw new Error(
                    'Staking failed - insufficient balance or not approved'
                );
            }

            setSuccess(
                `successfully staked ${amount} ${getTokenName(
                    selectedToken
                )} - refreshing`
            );
            setStakeInput('');
            setInputTouched(false);

            // Call the onStakeComplete callback to trigger a refresh
            if (onStakeComplete) {
                setTimeout(() => {
                    onStakeComplete();
                }, 3000);
            }

            // Refresh the token balance after successful stake
            if (selectedToken && walletAddress) {
                const newBalance = await getBalance(
                    walletAddress,
                    selectedToken
                );
                setTokenBalance(newBalance);
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

    // Handle unstake function
    const handleUnstake = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedToken) {
            setError('please select a token to unstake');
            return;
        }

        const currentBalance = stakedBalances.find(
            (balance) => balance.name === getTokenName(selectedToken)
        );

        if (!currentBalance || BigInt(currentBalance.amount) === BigInt(0)) {
            setError('you have no tokens staked to unstake');
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);
            setSuccess(null);

            const result = await unstakeToken(selectedToken);
            if (!result) {
                throw new Error('Unstaking failed');
            }

            setSuccess(
                `successfully unstaked your ${getTokenName(selectedToken)}`
            );
            if (onStakeComplete) {
                onStakeComplete();
            }
        } catch (err: any) {
            setError(
                err?.message || 'oopsie! something went wrong while unstaking'
            );
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

    // Calculate validation state
    const inputError = inputTouched ? validateInput(stakeInput) : null;
    const isValidInput = inputTouched && !inputError && stakeInput !== '';

    return (
        <div className="space-y-4">
            <RewardsDisplay walletAddress={walletAddress} />

            {error && (
                <Alert className="bg-red-50 border-red-400">
                    <AlertTitle className="font-comic">oopsie!</AlertTitle>
                    <AlertDescription className="font-comic">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="bg-green-50 border-green-400">
                    <AlertTitle className="font-comic">nice!</AlertTitle>
                    <AlertDescription className="font-comic">
                        {success}
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

            {/* Balances Display */}
            {selectedToken && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                    {/* Wallet Balance */}
                    <div className="flex items-center space-x-2">
                        <Wallet className="h-5 w-5 text-meme-blue" />
                        <div>
                            <p className="font-comic text-sm text-gray-600">
                                wallet balance:
                            </p>
                            <p className="font-comic font-bold">
                                {isLoadingBalance ? (
                                    <RefreshCw className="animate-spin h-4 w-4 inline" />
                                ) : tokenBalance ? (
                                    formatBalance(tokenBalance.balance)
                                ) : (
                                    '0'
                                )}{' '}
                                {getTokenName(selectedToken)}
                            </p>
                        </div>
                    </div>

                    {/* Staked Balance */}
                    <div className="flex items-center space-x-2">
                        <ArrowUpCircle className="h-5 w-5 text-crypto-green" />
                        <div>
                            <p className="font-comic text-sm text-gray-600">
                                staked balance:
                            </p>
                            <p className="font-comic font-bold">
                                {formatBalance(
                                    stakedBalances.find(
                                        (balance) =>
                                            balance.name ===
                                            getTokenName(selectedToken)
                                    )?.amount ?? '0'
                                )}{' '}
                                {getTokenName(selectedToken)}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stake Form */}
            <form onSubmit={handleStake} className="space-y-4">
                <div className="relative">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="number"
                                value={stakeInput}
                                onChange={(e) =>
                                    handleInputChange(e.target.value)
                                }
                                placeholder="enter amount to stake"
                                className={`w-full p-3 rounded-lg border-2 font-comic focus:outline-none focus:ring-2 ${
                                    inputError
                                        ? 'border-red-400 focus:ring-red-400'
                                        : isValidInput
                                        ? 'border-crypto-green focus:ring-crypto-green'
                                        : 'border-meme-blue focus:ring-meme-blue'
                                }`}
                                disabled={isProcessing}
                                step="any"
                            />
                            {selectedToken && tokenBalance && (
                                <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-moon-yellow hover:bg-yellow-400 text-black rounded font-comic transition-colors"
                                >
                                    max
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-crypto-green text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                                isProcessing || !isValidInput || !selectedToken
                            }
                        >
                            {isProcessing ? (
                                <RefreshCw className="h-5 w-5 animate-spin" />
                            ) : (
                                <Sparkles className="h-5 w-5" />
                            )}
                            {isProcessing ? 'processing...' : 'stake'}
                        </button>
                    </div>
                    {inputError && (
                        <p className="text-red-500 text-sm font-comic mt-1">
                            {inputError}
                        </p>
                    )}
                </div>
            </form>

            {/* Unstake Form */}
            <form onSubmit={handleUnstake} className="space-y-4">
                <button
                    type="submit"
                    className="w-full bg-floor-pink text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessing || !selectedToken}
                >
                    {isProcessing ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                        <ArrowDownCircle className="h-5 w-5" />
                    )}
                    {isProcessing
                        ? 'processing...'
                        : selectedToken
                        ? `unstake all ${getTokenName(selectedToken)}`
                        : 'unstake all'}
                </button>
            </form>
        </div>
    );
};

export default Staker;
