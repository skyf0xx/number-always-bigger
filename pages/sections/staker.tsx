import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowDownCircle, Timer } from 'lucide-react';
import { useState } from 'react';

const Staker = () => {
    const [unstakeInput, setUnstakeInput] = useState('');
    const [stakeInput, setStakeInput] = useState('');

    // Mock stake function
    const handleStake = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);
        if (isNaN(amount) || amount <= 0) return;
        setStakeInput('');
        // TODO: Implement actual staking
    };

    // Mock unstake function
    const handleUnstake = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(unstakeInput);
        if (isNaN(amount) || amount <= 0) return;
        setUnstakeInput('');
        // TODO: Implement actual unstaking
    };
    return (
        <form onSubmit={handleUnstake} className="space-y-4">
            <div className="flex gap-4">
                <input
                    type="number"
                    value={unstakeInput}
                    onChange={(e) => setUnstakeInput(e.target.value)}
                    placeholder="enter amount to unstake"
                    className="flex-1 p-3 rounded-lg border-2 border-floor-pink font-comic focus:outline-none focus:ring-2 focus:ring-floor-pink"
                />
                <button
                    type="submit"
                    className="bg-floor-pink text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2"
                >
                    <ArrowDownCircle className="h-5 w-5" />
                    unstake
                </button>
            </div>
            <Alert className="bg-floor-pink/10 border-floor-pink">
                <Timer className="h-4 w-4" />
                <AlertTitle className="font-comic">heads up fren:</AlertTitle>
                <AlertDescription className="font-comic">
                    unstaking takes 24 hours to process. number still go up
                    during this time!
                </AlertDescription>
            </Alert>
        </form>
    );
};

export default Staker;
