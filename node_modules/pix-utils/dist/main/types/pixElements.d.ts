import { ValueOf } from './helpers';
import { PixDynamicFn, PixStaticFn } from './pixFunctions';
export interface PixEmvMandatoryElements {
    readonly merchantCategoryCode: string;
    readonly transactionCurrency: string;
    readonly countryCode: string;
    readonly merchantName: string;
    readonly merchantCity: string;
}
export interface PixEmvBasicElements extends PixEmvMandatoryElements {
    readonly oneTime?: boolean;
}
export declare enum PixElementType {
    DYNAMIC = "DYNAMIC",
    STATIC = "STATIC",
    INVALID = "INVALID"
}
export interface DynamicPixEmvElements extends PixEmvBasicElements {
    readonly type: PixElementType.DYNAMIC;
    readonly url: string;
}
export interface StaticPixEmvElements extends PixEmvBasicElements {
    readonly type: PixElementType.STATIC;
    readonly transactionAmount?: number;
    readonly pixKey: string;
    readonly txid?: string;
    readonly infoAdicional?: string;
    readonly fss?: string;
}
export interface InvalidPixEmvElements {
    readonly type: PixElementType.INVALID;
    readonly details: string;
}
export type PixElement = {
    [PixElementType.DYNAMIC]: DynamicPixEmvElements;
    [PixElementType.STATIC]: StaticPixEmvElements;
    [PixElementType.INVALID]: InvalidPixEmvElements;
};
export type PixElements = StaticPixEmvElements | DynamicPixEmvElements;
export type PixObject = {
    [PixElementType.DYNAMIC]: DynamicPixEmvElements;
    [PixElementType.STATIC]: StaticPixEmvElements;
    [PixElementType.INVALID]: InvalidPixEmvElements;
};
export type PixObjects = ValueOf<PixObject>;
export type PixStaticObject = StaticPixEmvElements & PixStaticFn;
export type PixDynamicObject = DynamicPixEmvElements & PixDynamicFn;
