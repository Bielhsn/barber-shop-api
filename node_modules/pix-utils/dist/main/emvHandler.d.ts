import { PixElements } from './types/pixElements';
import { ParsedTags } from './types/pixEmvSchema';
export declare function createEmv(elements: PixElements): string;
export declare function parseEmv({ emvCode, currentIndex, currentData, }: {
    emvCode: any;
    currentIndex?: number;
    currentData?: {};
}): ParsedTags;
