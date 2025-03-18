import { PixElement, PixElementType, PixObject } from './types/pixElements';
export declare function generatePixObject<T extends PixElementType>(elements: PixElement[T]): PixObject[T];
