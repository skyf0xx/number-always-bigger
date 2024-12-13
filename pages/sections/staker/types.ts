export interface StakedBalances {
    name: string;
    amount: string;
}

export interface TokenBalance {
    balance: string;
}

export interface AllowedTokens {
    addresses: Record<string, string>;
    names: Record<string, string>;
}

export interface StakerProps {
    walletAddress: string;
    onStakeComplete?: () => void;
    stakedBalances?: StakedBalances[];
}
