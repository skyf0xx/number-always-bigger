import { useState, useEffect } from 'react';
import { Search, ChevronDown, RefreshCw, Info } from 'lucide-react';
import { AllowedTokens } from '@/lib/wallet-actions';

interface TokenSelectorProps {
    selectedToken: string;
    onTokenSelect: (token: string) => void;
    allowedTokens: AllowedTokens;
    isProcessing: boolean;
}

type UserTokensResult = Array<{
    Name?: string;
    Ticker?: string;
    Logo?: string;
    Denomination: number;
    processId: string;
    balance?: string | null;
}>;

interface TokenInfo {
    key: string;
    name: string;
    address: string;
    isAvailable: boolean;
}

const TokenSelector = ({
    selectedToken,
    onTokenSelect,
    allowedTokens,
    isProcessing,
}: TokenSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [walletTokens, setWalletTokens] = useState<UserTokensResult>([]);
    const [isLoadingTokens, setIsLoadingTokens] = useState(true);

    useEffect(() => {
        const fetchWalletTokens = async () => {
            try {
                setIsLoadingTokens(true);
                if (window.arweaveWallet) {
                    const tokens = await window.arweaveWallet.userTokens();
                    setWalletTokens(tokens || []);
                }
            } catch (error) {
                console.error('Error fetching wallet tokens:', error);
                setWalletTokens([]);
            } finally {
                setIsLoadingTokens(false);
            }
        };

        fetchWalletTokens();
    }, []);

    // Create a set of wallet token addresses for faster lookup
    const walletTokenAddresses = new Set(
        walletTokens.map((token) => token.processId)
    );

    // Create arrays for available and unavailable tokens
    const { availableTokens, unavailableTokens } = Object.entries(
        allowedTokens.names
    )
        .map(
            ([key]): TokenInfo => ({
                key,
                name: allowedTokens.names[key],
                address: allowedTokens.addresses[key],
                isAvailable: walletTokenAddresses.has(
                    allowedTokens.addresses[key]
                ),
            })
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce<{
            availableTokens: TokenInfo[];
            unavailableTokens: TokenInfo[];
        }>(
            (acc, token) => {
                if (token.isAvailable) {
                    acc.availableTokens.push(token);
                } else {
                    acc.unavailableTokens.push(token);
                }
                return acc;
            },
            { availableTokens: [], unavailableTokens: [] }
        );

    // Filter based on search query
    const filteredAvailable = availableTokens.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredUnavailable = unavailableTokens.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get selected token name
    const selectedTokenName =
        [...availableTokens, ...unavailableTokens].find(
            (token) => token.address === selectedToken
        )?.name || 'choose a token fren';

    if (isLoadingTokens) {
        return (
            <div className="relative mb-4">
                <label className="block text-sm font-comic mb-2">
                    select token to stake:
                </label>
                <div className="w-full p-3 rounded-lg border-2 border-meme-blue bg-gray-50 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-gray-500">loading ur tokens...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative mb-4">
            <label className="block text-sm font-comic mb-2">
                select token to stake:
            </label>

            <button
                type="button"
                onClick={() => !isProcessing && setIsOpen(!isOpen)}
                className={`w-full p-3 rounded-lg border-2 font-comic 
                    ${
                        isProcessing
                            ? 'bg-gray-50 cursor-not-allowed'
                            : 'bg-white hover:border-meme-blue/70'
                    } 
                    border-meme-blue focus:outline-none focus:ring-2 focus:ring-meme-blue
                    flex justify-between items-center`}
                disabled={isProcessing}
            >
                <span className={selectedToken ? '' : 'text-gray-500'}>
                    {selectedTokenName}
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-meme-blue rounded-lg shadow-lg">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="search tokens..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 
                                    font-comic text-sm focus:outline-none focus:border-meme-blue"
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        {filteredAvailable.length === 0 &&
                        filteredUnavailable.length === 0 ? (
                            <div className="p-3 text-center text-gray-500 font-comic">
                                no matching tokens found
                            </div>
                        ) : (
                            <>
                                {/* Available Tokens */}
                                {filteredAvailable.length > 0 && (
                                    <div className="py-1">
                                        {filteredAvailable.map((token) => (
                                            <button
                                                key={token.key}
                                                onClick={() => {
                                                    onTokenSelect(
                                                        token.address
                                                    );
                                                    setIsOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className={`w-full p-3 text-left font-comic hover:bg-gray-50
                                                    flex items-center justify-between
                                                    ${
                                                        selectedToken ===
                                                        token.address
                                                            ? 'bg-meme-blue/10'
                                                            : ''
                                                    }`}
                                            >
                                                <span>{token.name}</span>
                                                {selectedToken ===
                                                    token.address && (
                                                    <span className="text-meme-blue">
                                                        •
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Divider if both sections are present */}
                                {filteredAvailable.length > 0 &&
                                    filteredUnavailable.length > 0 && (
                                        <div className="border-t border-gray-100" />
                                    )}

                                {/* Unavailable Tokens */}
                                {filteredUnavailable.length > 0 && (
                                    <div className="py-1">
                                        <div className="px-3 py-2 text-xs text-gray-500 font-comic bg-gray-50 flex items-center gap-2">
                                            <Info className="w-3 h-3" />
                                            tokens u need to get first
                                        </div>
                                        {filteredUnavailable.map((token) => (
                                            <div
                                                key={token.key}
                                                className="w-full p-3 text-left font-comic text-gray-400 flex items-center justify-between"
                                            >
                                                <span>{token.name}</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                    not in wallet
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TokenSelector;
