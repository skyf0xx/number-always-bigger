import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowDownCircle, Timer } from 'lucide-react';
import { useState } from 'react';
import { getStakedBalances, StakedBalances } from '@/lib/wallet-actions';

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
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle stake function
    const handleStake = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);
        if (isNaN(amount) || amount <= 0) {
            setError('please enter a valid amount fren');
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);

            // TODO: Implement actual staking logic here
            // This would involve calling your contract functions

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
                        disabled={isProcessing || !walletAddress}
                    >
                        <ArrowDownCircle className="h-5 w-5" />
                        {isProcessing ? 'processing...' : 'unstake'}
                    </button>
                </div>
            </form>

            {/* Display current staked balances */}
            {stakedBalances.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-comic mb-2">
                        your current stakes:
                    </h3>
                    <div className="space-y-2">
                        {stakedBalances.map((balance) => (
                            <div
                                key={balance.name}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                            >
                                <span className="font-comic">
                                    {balance.name}
                                </span>
                                <span className="font-comic">
                                    {balance.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Staker;
