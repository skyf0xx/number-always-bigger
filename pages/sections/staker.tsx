import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Timer,
    RefreshCw,
    Wallet,
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
    const [success, setSuccess] = useState<string | null>(null);
    const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);

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

    // Format balance for display
    const formatBalance = (amount: string): string => {
        const value = BigInt(amount);
        const integerPart = value / BigInt(1e8);
        const decimalPart = value % BigInt(1e8);
        return `${integerPart}.${decimalPart.toString().padStart(8, '0')}`;
    };

    // Get token name from address
    const getTokenName = (address: string): string => {
        const tokenKey = Object.entries(allowedTokens.addresses).find(
            ([_, addr]) => addr === address
        )?.[0];
        return tokenKey ? allowedTokens.names[tokenKey] : address;
    };

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

        if (
            tokenBalance &&
            BigInt(tokenBalance.balance) < BigInt(amount * 1e8)
        ) {
            setError('insufficient balance fren');
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
                `successfully staked ${amount} ${getTokenName(selectedToken)}`
            );
            setStakeInput('');
            if (onStakeComplete) {
                onStakeComplete();
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
            setUnstakeInput('');
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
                        <ArrowUpCircle
                            className={`h-5 w-5 ${
                                isProcessing ? 'animate-spin' : ''
                            }`}
                        />
                        {isProcessing ? 'processing...' : 'stake'}
                    </button>
                </div>
            </form>

            {/* Unstake Form */}
            <form onSubmit={handleUnstake} className="space-y-4">
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="w-full bg-floor-pink text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                            isProcessing || !walletAddress || !selectedToken
                        }
                    >
                        <ArrowDownCircle
                            className={`h-5 w-5 ${
                                isProcessing ? 'animate-spin' : ''
                            }`}
                        />
                        {isProcessing
                            ? 'processing...'
                            : selectedToken
                            ? `unstake all ${getTokenName(selectedToken)}`
                            : 'unstake all'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Staker;
