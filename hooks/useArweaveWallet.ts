import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

interface ArweaveWalletState {
    address: string | null;
    connecting: boolean;
    connected: boolean;
}
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

export function useArweaveWallet() {
    const [walletState, setWalletState] = useState<ArweaveWalletState>({
        address: null,
        connecting: false,
        connected: false,
    });
    const { toast } = useToast();

    const checkConnection = useCallback(async () => {
        try {
            // Check if ArConnect is installed
            if (!window.arweaveWallet) {
                return;
            }

            const permissions = await window.arweaveWallet.getPermissions();
            if (permissions.includes('ACCESS_ADDRESS')) {
                const address = await window.arweaveWallet.getActiveAddress();
                setWalletState({
                    address,
                    connecting: false,
                    connected: true,
                });
            }
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    }, []);

    useEffect(() => {
        checkConnection();

        // Listen for wallet events
        window.addEventListener('arweaveWalletLoaded', checkConnection);
        window.addEventListener('walletSwitch', checkConnection);

        return () => {
            window.removeEventListener('arweaveWalletLoaded', checkConnection);
            window.removeEventListener('walletSwitch', checkConnection);
        };
    }, [checkConnection]);

    const connect = async () => {
        try {
            setWalletState((prev) => ({ ...prev, connecting: true }));

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

            const address = await window.arweaveWallet.getActiveAddress();

            setWalletState({
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
            setWalletState((prev) => ({ ...prev, connecting: false }));
        }
    };

    const disconnect = async () => {
        try {
            await window.arweaveWallet.disconnect();
            setWalletState({
                address: null,
                connecting: false,
                connected: false,
            });

            toast({
                title: 'Wallet Disconnected',
                description: 'Successfully disconnected from Arweave wallet',
            });
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
            toast({
                title: 'Disconnection Failed',
                description: 'Failed to disconnect from Arweave wallet',
                variant: 'destructive',
            });
        }
    };

    return {
        ...walletState,
        connect,
        disconnect,
    };
}
