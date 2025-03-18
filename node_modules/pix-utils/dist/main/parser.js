"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractElements = exports.extractMandatoryElements = exports.parsePix = void 0;
const assembler_1 = require("./assembler");
const crc_1 = require("./crc");
const emvHandler_1 = require("./emvHandler");
const pixElements_1 = require("./types/pixElements");
const pixEmvSchema_1 = require("./types/pixEmvSchema");
const generateErrorObject_1 = require("./utils/generateErrorObject");
const validate_1 = require("./validate");
function parsePix(brCode) {
    // Parse EMV Code
    const emvElements = (0, emvHandler_1.parseEmv)({ emvCode: brCode });
    if (!emvElements.isValid)
        return (0, generateErrorObject_1.generateErrorObject)('invalid emv code');
    // Validate CRC16
    const crc = (0, crc_1.computeCRC)(brCode);
    if (crc !== emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_CRC))
        return (0, generateErrorObject_1.generateErrorObject)('invalid crc');
    // Extract Elements
    const elements = extractElements(emvElements);
    if ((0, validate_1.hasElementError)(elements))
        return (0, generateErrorObject_1.generateErrorObject)(elements.message);
    return (0, assembler_1.generatePixObject)(elements);
}
exports.parsePix = parsePix;
function extractMandatoryElements(emvElements) {
    return {
        merchantCategoryCode: emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_MCC),
        transactionCurrency: emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_TRANSACTION_CURRENCY),
        countryCode: emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_COUNTRY_CODE),
        merchantName: emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_MERCHANT_NAME),
        merchantCity: emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_MERCHANT_CITY),
    };
}
exports.extractMandatoryElements = extractMandatoryElements;
function extractElements(emvElements) {
    const basicElements = extractMandatoryElements(emvElements);
    if ((0, validate_1.isPix)(emvElements, 'static')) {
        const amountNumber = +emvElements.getTag(pixEmvSchema_1.EmvSchema.TAG_TRANSACTION_AMOUNT);
        const transactionAmount = !isNaN(amountNumber) ? amountNumber : 0;
        return Object.assign(Object.assign({ type: pixElements_1.PixElementType.STATIC }, basicElements), { pixKey: emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_PIXKEY, pixEmvSchema_1.EmvSchema.TAG_MAI), transactionAmount, infoAdicional: emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_INFO_ADD, pixEmvSchema_1.EmvSchema.TAG_MAI), txid: emvElements.getSubTag(pixEmvSchema_1.EmvAdditionalDataSchema.TAG_TXID, pixEmvSchema_1.EmvSchema.TAG_ADDITIONAL_DATA), fss: emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_FSS, pixEmvSchema_1.EmvSchema.TAG_MAI) });
    }
    if ((0, validate_1.isPix)(emvElements, 'dynamic')) {
        return Object.assign(Object.assign({ type: pixElements_1.PixElementType.DYNAMIC }, basicElements), { url: emvElements.getSubTag(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_URL, pixEmvSchema_1.EmvSchema.TAG_MAI) });
    }
    if (!(0, validate_1.isPix)(emvElements, 'pix') || !(0, validate_1.isPix)(emvElements, 'valid'))
        return (0, generateErrorObject_1.generateErrorObject)('invalid pix');
    return (0, generateErrorObject_1.generateErrorObject)('error');
}
exports.extractElements = extractElements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBZ0Q7QUFDaEQsK0JBQW1DO0FBQ25DLDZDQUF3QztBQUN4QyxxREFLNkI7QUFDN0IsdURBSzhCO0FBRTlCLHFFQUFrRTtBQUNsRSx5Q0FBb0Q7QUFFcEQsU0FBZ0IsUUFBUSxDQUFDLE1BQWM7SUFDckMsaUJBQWlCO0lBQ2pCLE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQVEsRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXpFLGlCQUFpQjtJQUNqQixNQUFNLEdBQUcsR0FBRyxJQUFBLGdCQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsSUFBSSxHQUFHLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQyx3QkFBUyxDQUFDLE9BQU8sQ0FBQztRQUMvQyxPQUFPLElBQUEseUNBQW1CLEVBQUMsYUFBYSxDQUFDLENBQUM7SUFFNUMsbUJBQW1CO0lBQ25CLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU5QyxJQUFJLElBQUEsMEJBQWUsRUFBQyxRQUFRLENBQUM7UUFBRSxPQUFPLElBQUEseUNBQW1CLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVFLE9BQU8sSUFBQSw2QkFBaUIsRUFBQyxRQUFRLENBQWUsQ0FBQztBQUNuRCxDQUFDO0FBaEJELDRCQWdCQztBQUVELFNBQWdCLHdCQUF3QixDQUN0QyxXQUFzQjtJQUV0QixPQUFPO1FBQ0wsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyx3QkFBUyxDQUFDLE9BQU8sQ0FBQztRQUMzRCxtQkFBbUIsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLHdCQUFTLENBQUMsd0JBQXdCLENBQUM7UUFDM0UsV0FBVyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzRCxZQUFZLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyx3QkFBUyxDQUFDLGlCQUFpQixDQUFDO1FBQzdELFlBQVksRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLHdCQUFTLENBQUMsaUJBQWlCLENBQUM7S0FDOUQsQ0FBQztBQUNKLENBQUM7QUFWRCw0REFVQztBQUVELFNBQWdCLGVBQWUsQ0FDN0IsV0FBc0I7SUFFdEIsTUFBTSxhQUFhLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFBLGdCQUFLLEVBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyx3QkFBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDM0UsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUscUNBQ0UsSUFBSSxFQUFFLDRCQUFjLENBQUMsTUFBTSxJQUN4QixhQUFhLEtBQ2hCLE1BQU0sRUFBRSxXQUFXLENBQUMsU0FBUyxDQUMzQiwyQkFBWSxDQUFDLGNBQWMsRUFDM0Isd0JBQVMsQ0FBQyxPQUFPLENBQ2xCLEVBQ0QsaUJBQWlCLEVBQ2pCLGFBQWEsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUNsQywyQkFBWSxDQUFDLGdCQUFnQixFQUM3Qix3QkFBUyxDQUFDLE9BQU8sQ0FDbEIsRUFDRCxJQUFJLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FDekIsc0NBQXVCLENBQUMsUUFBUSxFQUNoQyx3QkFBUyxDQUFDLG1CQUFtQixDQUM5QixFQUNELEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLHdCQUFTLENBQUMsT0FBTyxDQUFDLElBQ3ZFO0tBQ0g7SUFDRCxJQUFJLElBQUEsZ0JBQUssRUFBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDakMscUNBQ0UsSUFBSSxFQUFFLDRCQUFjLENBQUMsT0FBTyxJQUN6QixhQUFhLEtBQ2hCLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLHdCQUFTLENBQUMsT0FBTyxDQUFDLElBQ3ZFO0tBQ0g7SUFDRCxJQUFJLENBQUMsSUFBQSxnQkFBSyxFQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUEsZ0JBQUssRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDO1FBQzVELE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyxhQUFhLENBQUMsQ0FBQztJQUU1QyxPQUFPLElBQUEseUNBQW1CLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQXJDRCwwQ0FxQ0MifQ==