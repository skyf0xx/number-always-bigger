import { createDataItemSigner, result } from '@permaweb/aoconnect';
import { sendMessage } from './messages';
import { adjustDecimalString } from './utils';

// Constants
const STAKE_CONTRACT = 'KbUW8wkZmiEWeUG0-K8ohSO82TfTUdz6Lqu5nxDoQDc';
const NAB_PRICE_TARGET = 'bxpz3u2USXv8Ictxb0aso3l8V9UTimaiGp9henzDsl8';
const NAB_TOKEN = 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU';

// Types
export interface JWK {
    kty: string;
    n?: string;
    e?: string;
    d?: string;
    p?: string;
    q?: string;
    dp?: string;
    dq?: string;
    qi?: string;
}

export interface TotalSupplyResponse {
    Action: string;
    Data: string;
    Ticker: string;
}
export interface StakedBalance {
    name: string;
    amount: string;
}

export type StakedBalances = StakedBalance[];

interface MessageResult {
    Messages: Array<{
        Data?: string;
        Tags: Array<{
            name: string;
            value: string;
        }>;
    }>;
}

export interface AllowedTokens {
    addresses: { [key: string]: string };
    names: { [key: string]: string };
}

interface ArweaveWallet {
    connect(permissions: string[]): Promise<void>;
    disconnect(): Promise<void>;
}

// Helper Functions
async function connectWallet(): Promise<ArweaveWallet> {
    if (!('arweaveWallet' in globalThis)) {
        throw new Error(
            'Arweave wallet is not available. Please install or enable it.'
        );
    }

    const arweaveWallet = (globalThis as any).arweaveWallet as ArweaveWallet;
    await arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
    return arweaveWallet;
}

async function sendAndGetResult(
    target: string,
    tags: { name: string; value: string }[],
    signer = false
): Promise<MessageResult> {
    const messageId = await sendMessage(target, tags, signer);
    if (!messageId) {
        throw new Error('Failed to send message');
    }

    return await result({
        message: messageId,
        process: target,
    });
}

function parseMessageData<T>(result: MessageResult, errorMessage: string): T {
    if (!result.Messages?.[0]?.Data) {
        throw new Error(errorMessage);
    }
    return JSON.parse(result.Messages[0].Data);
}

function findTagValue(
    result: MessageResult,
    tagName: string
): string | undefined {
    return result.Messages[0].Tags.find((tag) => tag.name === tagName)?.value;
}

function handleError<T>(error: unknown, context: string, defaultValue?: T): T {
    console.error(`Error ${context}:`, error);
    if (defaultValue !== undefined) {
        return defaultValue;
    }
    throw error;
}

async function executeWalletAction<T>(
    actionName: string,
    action: () => Promise<T>,
    defaultValue: T
): Promise<T> {
    try {
        await connectWallet();
        return await action();
    } catch (error) {
        return handleError(error, actionName, defaultValue);
    }
}

// Balance response interface
export interface TokenBalance {
    balance: string;
    ticker: string;
    account: string;
}

// New getBalance function
export async function getBalance(
    address: string,
    token: string
): Promise<TokenBalance | null> {
    const tags = [
        { name: 'Action', value: 'Balance' },
        { name: 'Target', value: address },
    ];

    try {
        const result = await sendAndGetResult(token, tags);
        // Get values from tags
        const balance = findTagValue(result, 'Balance');
        const ticker = findTagValue(result, 'Ticker');
        const account = address;

        if (!balance || !ticker || !account) {
            console.error('Missing required balance information in response');
            return null;
        }

        const denomination = await getTokenDenomination(token);
        const adjustedBalance = adjustDecimalString(balance, denomination);

        return {
            balance: adjustedBalance,
            ticker: ticker,
            account: account,
        };
    } catch (error) {
        return handleError(error, 'getting token balance', null);
    }
}

// Main Functions
export async function getAllowedTokens(): Promise<AllowedTokens> {
    const tags = [{ name: 'Action', value: 'Get-Allowed-Tokens' }];

    try {
        const result = await sendAndGetResult(STAKE_CONTRACT, tags);
        const [addresses, names] = parseMessageData<
            [{ [key: string]: string }, { [key: string]: string }]
        >(result, 'No allowed tokens data in response');

        return {
            addresses,
            names,
        };
    } catch (error) {
        return handleError(error, 'getting allowed tokens', {
            addresses: {},
            names: {},
        });
    }
}

export async function getStakedBalances(
    address: string
): Promise<StakedBalances> {
    const tags = [
        { name: 'Action', value: 'Get-Staked-Balances' },
        { name: 'Staker', value: address },
    ];

    try {
        const result = await sendAndGetResult(STAKE_CONTRACT, tags);
        const rawBalances = parseMessageData<StakedBalances>(
            result,
            'No staked balances data in response'
        );

        // Get all allowed tokens to map names to addresses
        const allowedTokens = await getAllowedTokens();
        const tokenAddressByName = Object.entries(allowedTokens.names).reduce(
            (acc, [key, name]) => ({
                ...acc,
                [name]: allowedTokens.addresses[key],
            }),
            {} as { [key: string]: string }
        );

        // Fetch denominations and adjust balances
        const adjustedBalances = await Promise.all(
            rawBalances.map(async (balance) => {
                const tokenAddress = tokenAddressByName[balance.name];
                if (!tokenAddress) {
                    console.warn(`Token address not found for ${balance.name}`);
                    return balance;
                }

                try {
                    const denomination = await getTokenDenomination(
                        tokenAddress
                    );
                    return {
                        ...balance,
                        amount: adjustDecimalString(
                            balance.amount,
                            denomination
                        ),
                    };
                } catch (error) {
                    console.error(
                        `Error getting denomination for ${balance.name}:`,
                        error
                    );
                    return balance;
                }
            })
        );

        return adjustedBalances;
    } catch (error) {
        return handleError(error, 'getting staked balances', []);
    }
}

export async function getNABPrice(): Promise<number | false> {
    const quantity = (1 * Math.pow(10, 8)).toString();
    const tags = [
        { name: 'Action', value: 'Get-Price' },
        { name: 'Token', value: NAB_TOKEN },
        { name: 'Quantity', value: quantity },
    ];

    try {
        const result = await sendAndGetResult(NAB_PRICE_TARGET, tags);
        const priceValue = findTagValue(result, 'Price');

        if (!priceValue) {
            console.error('Price tag not found in response');
            return false;
        }

        return parseFloat(priceValue) / Math.pow(10, 6);
    } catch (error) {
        return handleError(error, 'getting NAB price', false);
    }
}

export async function getStakeOwnership(address: string): Promise<number> {
    const tags = [
        { name: 'Action', value: 'Get-Stake-Ownership' },
        { name: 'Staker', value: address },
    ];

    try {
        const result = await sendAndGetResult(STAKE_CONTRACT, tags);
        const ownershipData = parseMessageData<{
            percentage: string;
        }>(result, 'No ownership data in response');

        const percentage = Number(ownershipData.percentage);
        return isNaN(percentage) ? 0 : percentage;
    } catch (error) {
        return handleError(error, 'getting stake ownership', 0);
    }
}

export async function getTokenDenomination(token: string): Promise<number> {
    const tags = [{ name: 'Action', value: 'Info' }];

    try {
        const result = await sendAndGetResult(token, tags);
        const denominationTag = result.Messages[0]?.Tags.find(
            (tag) => tag.name === 'Denomination'
        );

        if (!denominationTag) {
            throw new Error('Denomination tag not found in response');
        }

        const denomination = Number(denominationTag.value);
        return isNaN(denomination) ? 8 : denomination;
    } catch (error) {
        return handleError(error, 'getting token denomination', 8);
    }
}

export async function unstakeToken(token: string): Promise<boolean> {
    return executeWalletAction(
        'unstaking token',
        async () => {
            const tags = [
                { name: 'Action', value: 'Unstake' },
                { name: 'Token', value: token },
            ];

            const signer = createDataItemSigner(
                (globalThis as any).arweaveWallet
            );
            const result = await sendAndGetResult(
                STAKE_CONTRACT,
                tags,
                signer as any
            );

            if (result.Messages && result.Messages.length > 0) {
                const errorTag = result.Messages[0].Tags.find(
                    (tag) => tag.name === 'Error'
                );
                if (errorTag) {
                    console.error('Unstake error:', errorTag.value);
                    return false;
                }
                return true;
            }
            return false;
        },
        false
    );
}

export async function stakeToken(
    amount: number,
    token: string
): Promise<string | boolean> {
    return executeWalletAction(
        'staking token',
        async () => {
            const denomination = await getTokenDenomination(token);
            const quantity = Math.floor(
                amount * Math.pow(10, denomination)
            ).toString();

            const tags = [
                { name: 'Action', value: 'Transfer' },
                { name: 'Recipient', value: STAKE_CONTRACT },
                { name: 'Quantity', value: quantity },
            ];

            const signer = createDataItemSigner(
                (globalThis as any).arweaveWallet
            );
            const result = await sendAndGetResult(token, tags, signer as any);

            if ((result as any).Error) {
                throw new Error('Error: ' + (result as any).Error);
            }

            // Check all messages for the Debit-Notice action
            const hasDebitNotice = result.Messages?.some((message) =>
                message.Tags.some(
                    (tag) =>
                        tag.name === 'Action' && tag.value === 'Debit-Notice'
                )
            );

            // If we found a Debit-Notice, transaction was successful
            return hasDebitNotice ? true : false;
        },
        false
    );
}

/**
 * Fetches the current total supply of NAB tokens in circulation
 * @returns The total supply as a formatted string, or null if the fetch fails
 */
export const getTotalSupply = async (): Promise<string | null> => {
    const tags = [{ name: 'Action', value: 'Total-Supply' }];

    try {
        const result = await sendAndGetResult(NAB_TOKEN, tags);
        if (!result.Messages?.[0]?.Data) {
            throw new Error('No total supply data in response');
        }

        // Get token denomination for proper decimal formatting
        const denomination = await getTokenDenomination(NAB_TOKEN);

        // Format the total supply with proper decimal places
        return Number.parseFloat(
            adjustDecimalString(result.Messages[0].Data, denomination)
        ).toLocaleString(undefined, { maximumFractionDigits: denomination });
    } catch (error) {
        return handleError(error, 'getting total supply', null);
    }
};
