import React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from './use-toast';

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
    tokens: UserTokensResult;
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

            // Calculate position to center the dashboard
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

export const useArweaveWalletStore = create<ArweaveWalletState>()(
    devtools(
        (set, get) => ({
            address: null,
            connecting: false,
            connected: false,
            tokens: [],

            scrollToStakingDashboard: () => {
                // Allow time for the dashboard to render
                scrollToDashboard();
            },

            checkConnection: async () => {
                try {
                    // Check if ArConnect is installed
                    if (!window.arweaveWallet) {
                        return;
                    }

                    const currentVersion = '1'; // in case we ever update permissions
                    const version = localStorage.getItem('version');
                    if (currentVersion !== version) {
                        await window.arweaveWallet.disconnect();
                        localStorage.setItem('version', currentVersion);
                        set({
                            address: null,
                            connecting: false,
                            connected: false,
                            tokens: [],
                        });
                        return;
                    }

                    const permissions =
                        await window.arweaveWallet.getPermissions();

                    if (permissions.includes('ACCESS_ADDRESS')) {
                        const [tokens, address] = await Promise.all([
                            window.arweaveWallet.userTokens() as Promise<UserTokensResult>,
                            window.arweaveWallet.getActiveAddress(),
                        ]);

                        set({
                            address,
                            connecting: false,
                            connected: true,
                            tokens,
                        });
                    }
                } catch (error) {
                    console.error('Error checking connection:', error);
                }
            },

            connect: async () => {
                try {
                    set({ connecting: true });

                    // Check if ArConnect is installed
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
                        //note! Update version if you ever change permissions
                        'ACCESS_ADDRESS',
                        'ACCESS_TOKENS',
                        'SIGN_TRANSACTION',
                        'DISPATCH',
                    ];

                    await window.arweaveWallet.connect(permissions);

                    const [tokens, address] = await Promise.all([
                        window.arweaveWallet.userTokens() as Promise<UserTokensResult>,
                        window.arweaveWallet.getActiveAddress(),
                    ]);

                    set({
                        address,
                        connecting: false,
                        connected: true,
                        tokens,
                    });

                    // Scroll to staking dashboard after successful connection
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
                        tokens: [],
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
