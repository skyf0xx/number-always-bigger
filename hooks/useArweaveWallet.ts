import React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from './use-toast';
import { AllowedTokens, getAllowedTokens } from '@/lib/wallet-actions';

export type UserTokensResult = Array<{
    Name?: string;
    Ticker?: string;
    Logo?: string;
    Denomination: number;
    processId: string;
    balance?: string | null;
}>;

interface ArweaveWalletState {
    address: string | null;
    connecting: boolean;
    connected: boolean;
    newLPTokens: UserTokensResult;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    checkConnection: () => Promise<void>;
    scrollToStakingDashboard: () => void;
}

export const scrollToDashboard = () => {
    setTimeout(() => {
        const dashboard = document.getElementById('staking-dashboard');
        if (dashboard) {
            const headerHeight = 64;
            const dashboardRect = dashboard.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const elementPosition =
                window.scrollY +
                dashboardRect.top -
                viewportHeight / 2 +
                dashboardRect.height / 2 -
                headerHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
            });
        }
    }, 100);
};

// Helper function to filter out allowed tokens
const filterOutAllowedTokens = (
    tokens: UserTokensResult,
    allowedTokens: AllowedTokens | null
): UserTokensResult => {
    if (!allowedTokens) throw new Error('Allowed tokens not found');

    const allowedAddresses = new Set(Object.values(allowedTokens.addresses));
    return tokens.filter((token) => !allowedAddresses.has(token.processId));
};

const fetchAllowedTokens = async () => {
    try {
        return await getAllowedTokens();
    } catch (error) {
        console.error('Error fetching allowed tokens:', error);
        toast({
            title: 'Failed to fetch allowed tokens',
            description: 'Please try refreshing the page',
            variant: 'destructive',
        });
        return null;
    }
};

export const useArweaveWalletStore = create<ArweaveWalletState>()(
    devtools(
        (set, get) => ({
            address: null,
            connecting: false,
            connected: false,
            newLPTokens: [],
            allowedTokens: null,

            scrollToStakingDashboard: () => {
                scrollToDashboard();
            },

            checkConnection: async () => {
                try {
                    // Check if ArConnect is installed
                    if (!window.arweaveWallet) {
                        return;
                    }

                    const currentVersion = '1';
                    const version = localStorage.getItem('version');
                    if (currentVersion !== version) {
                        await window.arweaveWallet.disconnect();
                        localStorage.setItem('version', currentVersion);
                        set({
                            address: null,
                            connecting: false,
                            connected: false,
                            newLPTokens: [],
                        });
                        return;
                    }

                    const permissions =
                        await window.arweaveWallet.getPermissions();

                    if (permissions.includes('ACCESS_ADDRESS')) {
                        const [tokens, address, allowedTokens] =
                            await Promise.all([
                                window.arweaveWallet.userTokens() as Promise<UserTokensResult>,
                                window.arweaveWallet.getActiveAddress(),
                                fetchAllowedTokens(),
                            ]);

                        // Filter out allowed tokens
                        const filteredTokens = filterOutAllowedTokens(
                            tokens,
                            allowedTokens
                        );
                        console.log({
                            filteredTokens,
                            alloweed: allowedTokens,
                        });
                        set({
                            address,
                            connecting: false,
                            connected: true,
                            newLPTokens: filteredTokens,
                        });
                    }
                } catch (error) {
                    console.error('Error checking connection:', error);
                }
            },

            connect: async () => {
                try {
                    set({ connecting: true });

                    if (!window.arweaveWallet) {
                        toast({
                            title: 'Wallet Not Found',
                            description: 'Please install ArConnect to continue',
                            variant: 'destructive',
                        });
                        window.open('https://arconnect.io', '_blank');
                        return;
                    }

                    const permissions = [
                        'ACCESS_ADDRESS',
                        'ACCESS_TOKENS',
                        'SIGN_TRANSACTION',
                        'DISPATCH',
                    ];

                    await window.arweaveWallet.connect(permissions);

                    const [tokens, address, allowedTokens] = await Promise.all([
                        window.arweaveWallet.userTokens() as Promise<UserTokensResult>,
                        window.arweaveWallet.getActiveAddress(),
                        fetchAllowedTokens(),
                    ]);

                    // Filter out allowed tokens
                    const filteredTokens = filterOutAllowedTokens(
                        tokens,
                        allowedTokens
                    );

                    set({
                        address,
                        connecting: false,
                        connected: true,
                        newLPTokens: filteredTokens,
                    });

                    get().scrollToStakingDashboard();

                    toast({
                        title: 'Wallet Connected',
                        description: 'Successfully connected to Arweave wallet',
                    });
                } catch (error) {
                    console.error('Error connecting wallet:', error);
                    toast({
                        title: 'Connection Failed',
                        description: 'Failed to connect to Arweave wallet',
                        variant: 'destructive',
                    });
                } finally {
                    set({ connecting: false });
                }
            },

            disconnect: async () => {
                try {
                    await window.arweaveWallet.disconnect();
                    set({
                        address: null,
                        connecting: false,
                        connected: false,
                        newLPTokens: [],
                    });

                    toast({
                        title: 'Wallet Disconnected',
                        description:
                            'Successfully disconnected from Arweave wallet',
                    });
                } catch (error) {
                    console.error('Error disconnecting wallet:', error);
                    toast({
                        title: 'Disconnection Failed',
                        description: 'Failed to disconnect from Arweave wallet',
                        variant: 'destructive',
                    });
                }
            },
        }),
        { name: 'arweave-wallet-store' }
    )
);

// Hook to initialize wallet event listeners
export const useArweaveWalletInit = () => {
    const checkConnection = useArweaveWalletStore(
        (state) => state.checkConnection
    );

    React.useEffect(() => {
        // Initial setup
        checkConnection();

        // Listen for wallet events
        window.addEventListener('arweaveWalletLoaded', checkConnection);
        window.addEventListener('walletSwitch', checkConnection);

        return () => {
            window.removeEventListener('arweaveWalletLoaded', checkConnection);
            window.removeEventListener('walletSwitch', checkConnection);
        };
    }, [checkConnection]);
};

// Type declaration for global window object
declare global {
    interface Window {
        arweaveWallet: {
            userTokens(): Promise<UserTokensResult>;
            connect: (permissions: string[]) => Promise<void>;
            disconnect: () => Promise<void>;
            getActiveAddress: () => Promise<string>;
            getPermissions: () => Promise<string[]>;
        };
    }
}
