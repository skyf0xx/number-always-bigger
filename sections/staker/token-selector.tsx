import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { AllowedTokens } from '@/lib/wallet-actions';

interface TokenSelectorProps {
    selectedToken: string;
    onTokenSelect: (token: string) => void;
    allowedTokens: AllowedTokens;
    isProcessing: boolean;
}

const TokenSelector = ({
    selectedToken,
    onTokenSelect,
    allowedTokens,
    isProcessing,
}: TokenSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Sort tokens alphabetically by name
    const sortedTokens = Object.entries(allowedTokens.names)
        .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
        .map(([key]) => ({
            key,
            name: allowedTokens.names[key],
            address: allowedTokens.addresses[key],
        }));

    // Filter tokens based on search query
    const filteredTokens = sortedTokens.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get the currently selected token's name
    const selectedTokenName =
        sortedTokens.find((token) => token.address === selectedToken)?.name ||
        'choose a token fren';

    return (
        <div className="relative mb-4">
            <label className="block text-sm font-comic mb-2">
                select token to stake:
            </label>

            {/* Custom select button */}
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

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-meme-blue rounded-lg shadow-lg">
                    {/* Search input */}
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

                    {/* Token list */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredTokens.length === 0 ? (
                            <div className="p-3 text-center text-gray-500 font-comic">
                                no tokens found fren
                            </div>
                        ) : (
                            filteredTokens.map((token) => (
                                <button
                                    key={token.key}
                                    onClick={() => {
                                        onTokenSelect(token.address);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={`w-full p-3 text-left font-comic hover:bg-gray-50
                                        flex items-center justify-between
                                        ${
                                            selectedToken === token.address
                                                ? 'bg-meme-blue/10'
                                                : ''
                                        }`}
                                >
                                    <span>{token.name}</span>
                                    {selectedToken === token.address && (
                                        <span className="text-meme-blue">
                                            •
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TokenSelector;
