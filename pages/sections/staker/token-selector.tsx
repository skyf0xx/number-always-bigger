import { AllowedTokens } from './types';

interface TokenSelectorProps {
    selectedToken: string;
    onTokenSelect: (token: string) => void;
    allowedTokens: AllowedTokens;
    isProcessing: boolean;
}

export const TokenSelector = ({
    selectedToken,
    onTokenSelect,
    allowedTokens,
    isProcessing,
}: TokenSelectorProps) => (
    <div className="mb-4">
        <label className="block text-sm font-comic mb-2">
            select token to stake:
        </label>
        <select
            value={selectedToken}
            onChange={(e) => onTokenSelect(e.target.value)}
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
);
