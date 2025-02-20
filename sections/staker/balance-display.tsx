import {
    Wallet,
    ArrowUpCircle,
    RefreshCw,
    Coins,
    AlertTriangle,
} from 'lucide-react';
import { formatBalance, formatTokenName } from '@/lib/utils';
import { StakedBalances, TokenBalance } from '@/lib/wallet-actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

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
    const MINT_TOKEN = 'SWQx44W-1iMwGFBSHlC3lStCq3Z7O2WZrx9quLeZOu0';

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
        <div className="space-y-4">
            {selectedToken === MINT_TOKEN && (
                <Alert className="border-4 border-moon-yellow bg-moon-yellow/10">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="font-comic text-lg">
                        heads up about MINT staking!
                    </AlertTitle>
                    <AlertDescription className="text-sm mt-2 space-y-2">
                        <p>
                            Once you stake MINT tokens, they{' '}
                            <span className="font-bold">
                                cannot be unstaked
                            </span>
                            .
                        </p>
                        <p>This is by design - MINT staking is permanent! 🔒</p>
                        <p>
                            <Link
                                href="https://mithril-mint-token.ar.io"
                                target="_blank"
                                className="text-meme-blue hover:underline inline-flex items-center gap-1"
                            >
                                learn more about MINT token
                                <ArrowUpCircle className="h-4 w-4" />
                            </Link>
                        </p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
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
                            {formatTokenName(getTokenName(selectedToken))}
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
                                        balance.name ===
                                        getTokenName(selectedToken)
                                )?.amount ?? '0'
                            )}{' '}
                            {formatTokenName(getTokenName(selectedToken))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceDisplay;
