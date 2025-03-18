import { PixDynamicObject, PixElements, PixObjects, PixStaticObject } from './types/pixElements';
import { ValidTags } from './types/pixEmvSchema';
import { PixError } from './types/pixError';
export declare function isPix(emvElements: ValidTags, test: 'pix' | 'valid' | 'static' | 'dynamic'): boolean;
export declare function hasError(pixElement: PixObjects | PixError): pixElement is PixError;
export declare function hasElementError(pixElement: PixElements | PixError): pixElement is PixError;
export declare function isStaticPix(pixElement: PixObjects): pixElement is PixStaticObject;
export declare function isDynamicPix(pixElement: PixObjects): pixElement is PixDynamicObject;
