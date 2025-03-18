import { PIXPayload } from './types/pixDynamicPayload';
import { PixError } from './types/pixError';
export type PIXFetchResults = {
    readonly jwsString: string;
    readonly jws: {
        readonly hdr: Uint8Array;
        readonly payload: Uint8Array;
        readonly signature: Uint8Array;
    };
    readonly header: Record<string, unknown>;
    readonly payload: PIXPayload;
};
export type PIXFetchParams = {
    readonly url: string;
    readonly DPP?: string;
    readonly codMun?: number;
};
export default function fetchPayload({ url, DPP, codMun, }: PIXFetchParams): Promise<PIXFetchResults | PixError>;
