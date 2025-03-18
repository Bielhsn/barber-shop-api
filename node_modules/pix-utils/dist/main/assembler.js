"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePixObject = void 0;
const dynamicPayload_1 = __importDefault(require("./dynamicPayload"));
const emvHandler_1 = require("./emvHandler");
const pixElements_1 = require("./types/pixElements");
const qrcodeGenerator_1 = require("./utils/qrcodeGenerator");
function generateThrowFn(obj) {
    return () => (Object.assign(Object.assign({}, obj), { throwIfError: () => obj }));
}
function generatePixObject(elements) {
    if (elements.type === pixElements_1.PixElementType.INVALID) {
        throw new Error('Invalid Pix type');
    }
    const emvCode = (0, emvHandler_1.createEmv)(elements);
    const generatedObject = Object.assign(Object.assign(Object.assign({}, elements), { toBRCode: () => emvCode, toImage: () => (0, qrcodeGenerator_1.toBase64)(emvCode) }), (elements.type === pixElements_1.PixElementType.DYNAMIC
        ? {
            fetchPayload: ({ DPP, codMun }) => (0, dynamicPayload_1.default)({ url: elements.url, DPP, codMun }),
        }
        : {}));
    return Object.assign(Object.assign({}, generatedObject), { throwIfError: generateThrowFn(generatedObject) });
}
exports.generatePixObject = generatePixObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2VtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFBNEM7QUFDNUMsNkNBQXlDO0FBQ3pDLHFEQUE0RTtBQUM1RSw2REFBbUQ7QUFFbkQsU0FBUyxlQUFlLENBQ3RCLEdBQWtCO0lBRWxCLE9BQU8sR0FBRyxFQUFFLENBQUMsaUNBQ1IsR0FBRyxLQUNOLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQy9CLFFBQXVCO0lBRXZCLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyw0QkFBYyxDQUFDLE9BQU8sRUFBRTtRQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDckM7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFBLHNCQUFTLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsTUFBTSxlQUFlLGlEQUNoQixRQUFRLEtBQ1gsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUEsMEJBQVEsRUFBQyxPQUFPLENBQUMsS0FDN0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLDRCQUFjLENBQUMsT0FBTztRQUMxQyxDQUFDLENBQUM7WUFDRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQ2hDLElBQUEsd0JBQVksRUFBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUNuRDtRQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDUixDQUFDO0lBRUYsdUNBQ0ssZUFBZSxLQUNsQixZQUFZLEVBQUUsZUFBZSxDQUFJLGVBQWUsQ0FBQyxJQUNqRDtBQUNKLENBQUM7QUF4QkQsOENBd0JDIn0=