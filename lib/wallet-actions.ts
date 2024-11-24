import { result } from '@permaweb/aoconnect';
import { sendMessage } from './messages';

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
