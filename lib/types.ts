import { StakedBalances } from '@/lib/wallet-actions';

export interface AllowedTokens {
    addresses: Record<string, string>;
    names: Record<string, string>;
}

export interface StakerProps {
    walletAddress: string;
    onStakeComplete?: () => void;
    stakedBalances?: StakedBalances;
}
