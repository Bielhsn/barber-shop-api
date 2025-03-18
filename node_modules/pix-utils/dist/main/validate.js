"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDynamicPix = exports.isStaticPix = exports.hasElementError = exports.hasError = exports.isPix = void 0;
const pixElements_1 = require("./types/pixElements");
const pixEmvSchema_1 = require("./types/pixEmvSchema");
function isPix(emvElements, test) {
    if (!emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_MAI))
        return false;
    const isDynamic = emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_URL, pixEmvSchema_1.EmvSchema.TAG_MAI);
    const isStatic = emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_PIXKEY, pixEmvSchema_1.EmvSchema.TAG_MAI);
    switch (test) {
        case 'pix':
            return true;
        case 'valid':
            return !!isStatic || !!isDynamic;
        case 'static':
            return !!isStatic;
        case 'dynamic':
            return !!isDynamic;
        default:
            return false;
    }
}
exports.isPix = isPix;
function hasError(pixElement) {
    return !!pixElement.error;
}
exports.hasError = hasError;
function hasElementError(pixElement) {
    return !!pixElement.error;
}
exports.hasElementError = hasElementError;
function isStaticPix(pixElement) {
    return pixElement && pixElement.type === pixElements_1.PixElementType.STATIC;
}
exports.isStaticPix = isStaticPix;
function isDynamicPix(pixElement) {
    return pixElement && pixElement.type === pixElements_1.PixElementType.DYNAMIC;
}
exports.isDynamicPix = isDynamicPix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBTTZCO0FBQzdCLHVEQUEwRTtBQUcxRSxTQUFnQixLQUFLLENBQ25CLFdBQXNCLEVBQ3RCLElBQTRDO0lBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLHdCQUFTLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFekQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDckMsMkJBQVksQ0FBQyxXQUFXLEVBQ3hCLHdCQUFTLENBQUMsT0FBTyxDQUNsQixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDcEMsMkJBQVksQ0FBQyxjQUFjLEVBQzNCLHdCQUFTLENBQUMsT0FBTyxDQUNsQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLEtBQUs7WUFDUixPQUFPLElBQUksQ0FBQztRQUNkLEtBQUssT0FBTztZQUNWLE9BQU8sQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ25DLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNwQixLQUFLLFNBQVM7WUFDWixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDckI7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7QUEzQkQsc0JBMkJDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixVQUFpQztJQUVqQyxPQUFPLENBQUMsQ0FBRSxVQUF1QixDQUFDLEtBQUssQ0FBQztBQUMxQyxDQUFDO0FBSkQsNEJBSUM7QUFFRCxTQUFnQixlQUFlLENBQzdCLFVBQWtDO0lBRWxDLE9BQU8sQ0FBQyxDQUFFLFVBQXVCLENBQUMsS0FBSyxDQUFDO0FBQzFDLENBQUM7QUFKRCwwQ0FJQztBQUVELFNBQWdCLFdBQVcsQ0FDekIsVUFBc0I7SUFFdEIsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyw0QkFBYyxDQUFDLE1BQU0sQ0FBQztBQUNqRSxDQUFDO0FBSkQsa0NBSUM7QUFFRCxTQUFnQixZQUFZLENBQzFCLFVBQXNCO0lBRXRCLE9BQU8sVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssNEJBQWMsQ0FBQyxPQUFPLENBQUM7QUFDbEUsQ0FBQztBQUpELG9DQUlDIn0=