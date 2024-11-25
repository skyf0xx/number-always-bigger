import { result } from '@permaweb/aoconnect';
import { sendMessage } from './messages';
const STAKE_CONTRACT = 'KbUW8wkZmiEWeUG0-K8ohSO82TfTUdz6Lqu5nxDoQDc';
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

export const getStakedBalances = async (
    address: string
): Promise<StakedBalances> => {
    const tags = [
        { name: 'Action', value: 'Get-Staked-Balances' },
        { name: 'Staker', value: address },
    ];

    try {
        console.log('tags', tags);
        const messageId = await sendMessage(STAKE_CONTRACT, tags);
        console.log('messageId', messageId);
        if (!messageId) {
            throw new Error('Failed to send message');
        }

        const { Messages } = await result({
            message: messageId,
            process: STAKE_CONTRACT,
        });

        if (!Messages?.[0]?.Data) {
            throw new Error('No data in response');
        }
        console.log('parsed', JSON.parse(Messages[0].Data));
        return JSON.parse(Messages[0].Data);
    } catch (error) {
        console.error('Error getting staked balances:', error);
        throw error;
    }
};

export const getNABPrice = async (): Promise<number | false> => {
    const target = 'bxpz3u2USXv8Ictxb0aso3l8V9UTimaiGp9henzDsl8';
    const token = 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU';
    const quantity = (1 * Math.pow(10, 8)).toString(); //8 decimal places
    const tags = [
        { name: 'Action', value: 'Get-Price' },
        { name: 'Token', value: token },
        { name: 'Quantity', value: quantity },
    ];

    try {
        const messageId = await sendMessage(target, tags);

        if (!messageId) {
            return false;
        }

        const { Messages } = await result({
            message: messageId,
            process: target,
        });

        // Find the price tag in the response
        const priceTag = Messages[0].Tags.find(
            (tag: { name: string }) => tag.name === 'Price'
        );

        if (!priceTag) {
            console.error('Price tag not found in response');
            return false;
        }

        return parseFloat(priceTag.value) / Math.pow(10, 6);
    } catch (error) {
        console.error('Error getting NAB price:', error);
        throw error;
    }
};

export const getStakeOwnership = async (address: string): Promise<number> => {
    const tags = [
        { name: 'Action', value: 'Get-Stake-Ownership' },
        { name: 'Staker', value: address },
    ];

    try {
        const messageId = await sendMessage(STAKE_CONTRACT, tags);
        if (!messageId) {
            return 0;
        }

        const { Messages } = await result({
            message: messageId,
            process: STAKE_CONTRACT,
        });

        if (!Messages?.[0]?.Data) {
            return 0;
        }

        // Parse the JSON response
        const response = JSON.parse(Messages[0].Data);

        // The percentage is already calculated in the contract (multiplied by 100)
        // Convert from string to number and ensure it's not NaN
        const percentage = Number(response.percentage);
        return isNaN(percentage) ? 0 : percentage;
    } catch (error) {
        console.error('Error getting stake ownership:', error);
        return 0;
    }
};
/*
export const sendToken = async (
    recipient: string,
    amount: number,
    token: string,
    data = '',
    unsecureSigner = ''
): Promise<string | boolean> => {
    const quantity = Math.floor(
        amount * Math.pow(10, TOKEN_DENOMINATION)
    ).toString();
    const tags = [
        { name: 'Action', value: 'Transfer' },
        { name: 'Recipient', value: recipient },
        { name: 'Quantity', value: quantity },
    ];

    try {
        const messageId = await sendMessage(token, tags, data, unsecureSigner);
        if (!messageId) {
            return false;
        }
        return messageId;
    } catch (error) {
        console.error('Error sending token:', error);
        throw error;
    }
};

export const getBalance = async (
    address: string,
    token: string,
    jwk = ''
): Promise<number> => {
    const denomination = getDenomination();
    const tags = [
        { name: 'Action', value: 'Balance' },
        { name: 'Recipient', value: address },
    ];

    try {
        const messageId = await sendMessage(token, tags, '', jwk);
        const { Messages, Error } = await result({
            message: messageId,
            process: JOY_TOKEN,
        });

        if (Error) {
            throw new Error(`Error in balance result: ${Error}`);
        }

        const balanceData = Messages?.[0]?.Data;
        if (!balanceData) {
            throw new Error('No balance data found');
        }

        const balance = BigNumber.from(balanceData)
            .div(BigNumber.from(10).pow(denomination))
            .toNumber();

        return balance;
    } catch (error) {
        console.error('Error fetching balance:', error, { address, token });
        throw error;
    }
};
*/
