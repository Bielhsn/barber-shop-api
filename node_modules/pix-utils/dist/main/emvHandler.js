"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEmv = exports.createEmv = void 0;
const crc_1 = require("./crc");
const pixElements_1 = require("./types/pixElements");
const pixEmvSchema_1 = require("./types/pixEmvSchema");
const textParser_1 = require("./utils/textParser");
const zeroPad_1 = __importDefault(require("./utils/zeroPad"));
function generateEmvElement(elementId, value) {
    if (!value)
        return '';
    const parsedElementId = (0, zeroPad_1.default)(elementId, 2);
    const parsedLength = (0, zeroPad_1.default)(value.length, 2);
    return `${parsedElementId}${parsedLength}${value}`;
}
function generateMAI(elements) {
    if (elements.type === pixElements_1.PixElementType.STATIC) {
        return [
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_GUI, pixEmvSchema_1.EmvMaiSchema.BC_GUI),
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_PIXKEY, elements.pixKey),
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_INFO_ADD, elements.infoAdicional),
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_FSS, elements.fss),
        ].join('');
    }
    else if (elements.type === pixElements_1.PixElementType.DYNAMIC) {
        return [
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_GUI, pixEmvSchema_1.EmvMaiSchema.BC_GUI),
            generateEmvElement(pixEmvSchema_1.EmvMaiSchema.TAG_MAI_URL, elements.url),
        ].join('');
    }
    return undefined;
}
function generateAdditionalData(txid) {
    return generateEmvElement(pixEmvSchema_1.EmvAdditionalDataSchema.TAG_TXID, txid || '***');
}
function createEmv(elements) {
    if (![pixElements_1.PixElementType.STATIC, pixElements_1.PixElementType.DYNAMIC].includes(elements.type))
        return 'INVALID';
    const emvElements = [
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_INIT, '01'),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_ONETIME, elements.oneTime ? '12' : ''),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_MAI, generateMAI(elements)),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_MCC, elements.merchantCategoryCode),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_TRANSACTION_CURRENCY, elements.transactionCurrency),
        elements.type === pixElements_1.PixElementType.STATIC
            ? generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_TRANSACTION_AMOUNT, elements.transactionAmount > 0
                ? elements.transactionAmount.toFixed(2)
                : '')
            : '',
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_COUNTRY_CODE, elements.countryCode),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_MERCHANT_NAME, (0, textParser_1.normalizeName)(elements.merchantName)),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_MERCHANT_CITY, (0, textParser_1.normalizeCity)(elements.merchantCity)),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_ADDITIONAL_DATA, generateAdditionalData(elements.type === pixElements_1.PixElementType.STATIC ? elements.txid : '')),
        generateEmvElement(pixEmvSchema_1.EmvSchema.TAG_CRC, '0000'),
    ];
    const generatedEmv = emvElements.join('');
    return generatedEmv.replace(/\w{4}$/, (0, crc_1.computeCRC)(generatedEmv));
}
exports.createEmv = createEmv;
function parseEmv({ emvCode, currentIndex = 0, currentData = {}, }) {
    const tag = +emvCode.substring(currentIndex, currentIndex + 2);
    const length = Number(emvCode.substring(currentIndex + 2, currentIndex + 4));
    const value = emvCode.substring(currentIndex + 4, currentIndex + 4 + length);
    if (!length || !value.length || length !== value.length) {
        return {
            isValid: false,
            rawTags: currentData,
        };
    }
    const newData = Object.assign(Object.assign({}, currentData), { [tag]: Object.assign({ tag: tag, length: length, value: value }, (Object.values(pixEmvSchema_1.TagsWithSubTags).includes(tag)
            ? { subTags: parseEmv({ emvCode: value }) }
            : {})) });
    if (currentIndex + 4 + length === emvCode.length) {
        return {
            isValid: true,
            rawTags: newData,
            getTag: (tag) => { var _a; return (_a = newData === null || newData === void 0 ? void 0 : newData[Number(tag)]) === null || _a === void 0 ? void 0 : _a.value; },
            getSubTag: (tag, mainTag) => { var _a, _b; return (_b = (_a = newData === null || newData === void 0 ? void 0 : newData[Number(mainTag)]) === null || _a === void 0 ? void 0 : _a.subTags) === null || _b === void 0 ? void 0 : _b.getTag(Number(tag)); },
        };
    }
    else {
        return parseEmv({
            emvCode,
            currentIndex: currentIndex + 4 + length,
            currentData: newData,
        });
    }
}
exports.parseEmv = parseEmv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW12SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbXZIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUFtQztBQUNuQyxxREFBa0U7QUFDbEUsdURBTThCO0FBQzlCLG1EQUFrRTtBQUNsRSw4REFBc0M7QUFFdEMsU0FBUyxrQkFBa0IsQ0FBQyxTQUFpQixFQUFFLEtBQWE7SUFDMUQsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QixNQUFNLGVBQWUsR0FBRyxJQUFBLGlCQUFPLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sWUFBWSxHQUFHLElBQUEsaUJBQU8sRUFBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sR0FBRyxlQUFlLEdBQUcsWUFBWSxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxRQUFxQjtJQUN4QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssNEJBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDM0MsT0FBTztZQUNMLGtCQUFrQixDQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLDJCQUFZLENBQUMsTUFBTSxDQUFDO1lBQ2pFLGtCQUFrQixDQUFDLDJCQUFZLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDaEUsa0JBQWtCLENBQUMsMkJBQVksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3pFLGtCQUFrQixDQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDM0QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDWjtTQUFNLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyw0QkFBYyxDQUFDLE9BQU8sRUFBRTtRQUNuRCxPQUFPO1lBQ0wsa0JBQWtC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