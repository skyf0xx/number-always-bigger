import { result } from '@permaweb/aoconnect';
import { sendMessage } from './messages';

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

// Helper Functions
async function sendAndGetResult(
    target: string,
    tags: { name: string; value: string }[]
): Promise<MessageResult> {
    const messageId = await sendMessage(target, tags);
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

// Main Functions
export async function getStakedBalances(
    address: string
): Promise<StakedBalances> {
    const tags = [
        { name: 'Action', value: 'Get-Staked-Balances' },
        { name: 'Staker', value: address },
    ];

    try {
        const result = await sendAndGetResult(STAKE_CONTRACT, tags);
        return parseMessageData(result, 'No staked balances data in response');
    } catch (error) {
        return handleError(error, 'getting staked balances', []);
    }
}

export async function getNABPrice(): Promise<number | false> {
    const quantity = (1 * Math.pow(10, 8)).toString(); // 8 decimal places
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
        const infoData = parseMessageData<{
            denomination: number;
        }>(result, 'No token denomination data in response');

        return infoData.denomination;
    } catch (error) {
        return handleError(error, 'getting token denomination', 8); // Default to 8 decimals
    }
}

export async function stakeToken(
    amount: number,
    token: string,
    data = ''
): Promise<string | boolean> {
    try {
        const denomination = await getTokenDenomination(token);
        const quantity = Math.floor(
            amount * Math.pow(10, denomination)
        ).toString();

        const tags = [
            { name: 'Action', value: 'Transfer' },
            { name: 'Recipient', value: STAKE_CONTRACT },
            { name: 'Quantity', value: quantity },
        ];

        const result = await sendAndGetResult(token, tags);
        const transferId = findTagValue(result, 'Transfer-Id');

        return transferId || false;
    } catch (error) {
        return handleError(error, 'staking token', false);
    }
}
