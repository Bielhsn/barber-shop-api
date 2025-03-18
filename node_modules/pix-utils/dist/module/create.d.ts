import { CreateDynamicPixParams, CreateStaticPixParams } from './types/pixCreate';
import { PixDynamicObject, PixStaticObject } from './types/pixElements';
import { PixError } from './types/pixError';
export declare function createStaticPix(params: CreateStaticPixParams): PixStaticObject | PixError;
export declare function createDynamicPix(params: CreateDynamicPixParams): PixDynamicObject | PixError;
