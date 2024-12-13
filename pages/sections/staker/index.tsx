import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Sparkles, ArrowDownCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { checkMaintenance } from '@/lib/wallet-actions';
import { useTokenSelection } from './use-token-selection';
import { useStakingForm } from './use-staking-form';
import { StakerProps } from './types';
import RewardsDisplay from '../rewards';
import { BalanceDisplay } from './balance-display';
import { MaintenanceNotice } from './maintenance-notice';
import { TokenSelector } from './token-selector';

const Staker = ({
    walletAddress,
    onStakeComplete,
    stakedBalances = [],
}: StakerProps) => {
    const [underMaintenance, setUnderMaintenance] = useState(false);

    const {
        selectedToken,
        setSelectedToken,
        allowedTokens,
        isLoading,
        error: tokenError,
        tokenBalance,
        isLoadingBalance,
        getTokenName,
    } = useTokenSelection(walletAddress);

    const {
        stakeInput,
        isProcessing,
        error: stakingError,
        success,
        inputTouched,
        handleInputChange,
        handleStake,
        handleUnstake,
        validateInput,
    } = useStakingForm(onStakeComplete, getTokenName);

    useEffect(() => {
        const checkMaintenanceStatus = async () => {
            try {
                const maintenanceStatus = await checkMaintenance();
                setUnderMaintenance(maintenanceStatus);
            } catch (err) {
                console.error('Error checking maintenance status:', err);
                setUnderMaintenance(true);
            }
        };

        checkMaintenanceStatus();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <RefreshCw className="animate-spin mr-2" />
                <span className="font-comic">loading available tokens...</span>
            </div>
        );
    }

    const error = tokenError || stakingError;
    const isValidInput =
        inputTouched &&
        !validateInput(stakeInput, tokenBalance) &&
        stakeInput !== '';

    return (
        <div className="space-y-4">
            {underMaintenance && <MaintenanceNotice />}

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

            <TokenSelector
                selectedToken={selectedToken}
                onTokenSelect={setSelectedToken}
                allowedTokens={allowedTokens}
                isProcessing={isProcessing}
            />

            {selectedToken && (
                <BalanceDisplay
                    selectedToken={selectedToken}
                    tokenBalance={tokenBalance}
                    isLoadingBalance={isLoadingBalance}
                    stakedBalances={stakedBalances}
                    getTokenName={getTokenName}
                />
            )}

            {!underMaintenance && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleStake(selectedToken, tokenBalance);
                    }}
                    className="space-y-4"
                >
                    <div className="relative">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    value={stakeInput}
                                    onChange={(e) =>
                                        handleInputChange(e.target.value)
                                    }
                                    placeholder="enter amount to stake"
                                    className={`w-full p-3 rounded-lg border-2 font-comic focus:outline-none focus:ring-2 ${
                                        validateInput(stakeInput, tokenBalance)
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
                                        onClick={() => {
                                            handleInputChange(
                                                tokenBalance.balance
                                            );
                                        }}
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
                                    isProcessing ||
                                    !isValidInput ||
                                    !selectedToken
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
                        {validateInput(stakeInput, tokenBalance) && (
                            <p className="text-red-500 text-sm font-comic mt-1">
                                {validateInput(stakeInput, tokenBalance)}
                            </p>
                        )}
                    </div>
                </form>
            )}

            {!underMaintenance && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUnstake(selectedToken);
                    }}
                    className="space-y-4"
                >
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
            )}

            {underMaintenance && (
                <div className="mt-4 bg-moon-yellow/10 border-2 border-dashed border-moon-yellow rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="font-comic text-lg">
                            printer maintenance time!
                        </span>
                    </div>
                    <p className="font-comic text-gray-600">
                        staking and unstaking will be back shortly™️
                        <br />
                        <span className="text-sm">
                            (your tokens are always safe fren)
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Staker;
