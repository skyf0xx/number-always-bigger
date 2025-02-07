import { Wallet, ArrowUpCircle, RefreshCw, Coins } from 'lucide-react';
import { formatBalance } from '@/lib/utils';
import { StakedBalances, TokenBalance } from '@/lib/wallet-actions';

interface BalanceDisplayProps {
    selectedToken: string;
    tokenBalance: TokenBalance | null;
    isLoadingBalance: boolean;
    stakedBalances: StakedBalances;
    getTokenName: (address: string) => string;
}

const BalanceDisplay = ({
    selectedToken,
    tokenBalance,
    isLoadingBalance,
    stakedBalances,
    getTokenName,
}: BalanceDisplayProps) => {
    if (selectedToken === '4Aq_6sBUyEo6AlKRq6JLT9dDfYG5ThfznA_cXjwsJpM') {
        //TODO: Fix this hack so the default selected is always blank
        selectedToken = ''; //old expired token
    }

    if (!selectedToken) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Coins className="h-5 w-5" />
                    <p className="font-comic">
                        select a token to see ur balance
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
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
                                    balance.name === getTokenName(selectedToken)
                            )?.amount ?? '0'
                        )}{' '}
                        {getTokenName(selectedToken)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BalanceDisplay;
