import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from './use-toast';
import React from 'react';

interface ArweaveWalletState {
    address: string | null;
    connecting: boolean;
    connected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    checkConnection: () => Promise<void>;
}

export const useArweaveWalletStore = create<ArweaveWalletState>()(
    devtools(
        (set, get) => ({
            address: null,
            connecting: false,
            connected: false,

            checkConnection: async () => {
                try {
                    // Check if ArConnect is installed
                    if (!window.arweaveWallet) {
                        return;
                    }

                    const permissions =
                        await window.arweaveWallet.getPermissions();
                    if (permissions.includes('ACCESS_ADDRESS')) {
                        const address =
                            await window.arweaveWallet.getActiveAddress();
                        set({
                            address,
                            connecting: false,
                            connected: true,
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

                    // Request permissions
                    await window.arweaveWallet.connect([
                        'ACCESS_ADDRESS',
                        'SIGN_TRANSACTION',
                        'DISPATCH',
                    ]);

                    const address =
                        await window.arweaveWallet.getActiveAddress();

                    set({
                        address,
                        connecting: false,
                        connected: true,
                    });

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
            connect: (permissions: string[]) => Promise<void>;
            disconnect: () => Promise<void>;
            getActiveAddress: () => Promise<string>;
            getPermissions: () => Promise<string[]>;
        };
    }
}
