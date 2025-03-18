import { PixElements, PixEmvMandatoryElements, PixObjects } from './types/pixElements';
import { ValidTags } from './types/pixEmvSchema';
import { PixError } from './types/pixError';
export declare function parsePix(brCode: string): PixObjects | PixError;
export declare function extractMandatoryElements(emvElements: ValidTags): PixEmvMandatoryElements;
export declare function extractElements(emvElements: ValidTags): PixElements | PixError;
