"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDynamicPix = exports.createStaticPix = void 0;
const assembler_1 = require("./assembler");
const pixElements_1 = require("./types/pixElements");
const generateErrorObject_1 = require("./utils/generateErrorObject");
const defaultPixFields = {
    merchantCategoryCode: '0000',
    transactionCurrency: '986',
    countryCode: 'BR',
};
const defaultStaticFields = Object.assign(Object.assign({}, defaultPixFields), { isTransactionUnique: false, txid: '***' });
function createStaticPix(params) {
    if (params.merchantName.length > 25)
        return (0, generateErrorObject_1.generateErrorObject)('merchantName character limit exceeded (> 25)');
    if (params.txid && params.txid.length > 25)
        return (0, generateErrorObject_1.generateErrorObject)('txid character limit exceeded (> 25)');
    if (params.merchantCity === '')
        return (0, generateErrorObject_1.generateErrorObject)('merchantCity is required');
    if (params.merchantCity.length > 15)
        return (0, generateErrorObject_1.generateErrorObject)('merchantCity character limit exceeded (> 15)');
    const elements = Object.assign(Object.assign({ type: pixElements_1.PixElementType.STATIC }, defaultStaticFields), params);
    return (0, assembler_1.generatePixObject)(elements);
}
exports.createStaticPix = createStaticPix;
function createDynamicPix(params) {
    if (params.merchantName.length > 25)
        return (0, generateErrorObject_1.generateErrorObject)('merchantName character limit exceeded (> 25)');
    if (params.merchantCity === '')
        return (0, generateErrorObject_1.generateErrorObject)('merchantCity is required');
    if (params.merchantCity.length > 15)
        return (0, generateErrorObject_1.generateErrorObject)('merchantCity character limit exceeded (> 15)');
    const elements = Object.assign(Object.assign({ type: pixElements_1.PixElementType.DYNAMIC }, defaultStaticFields), params);
    return (0, assembler_1.generatePixObject)(elements);
}
exports.createDynamicPix = createDynamicPix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBZ0Q7QUFLaEQscURBTTZCO0FBRTdCLHFFQUFrRTtBQUVsRSxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLG9CQUFvQixFQUFFLE1BQU07SUFDNUIsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixXQUFXLEVBQUUsSUFBSTtDQUNsQixDQUFDO0FBRUYsTUFBTSxtQkFBbUIsbUNBQ3BCLGdCQUFnQixLQUNuQixtQkFBbUIsRUFBRSxLQUFLLEVBQzFCLElBQUksRUFBRSxLQUFLLEdBQ1osQ0FBQztBQUVGLFNBQWdCLGVBQWUsQ0FDN0IsTUFBNkI7SUFFN0IsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFO1FBQ2pDLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBRTdFLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFO1FBQ3hDLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBRXJFLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxFQUFFO1FBQzVCLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRXpELElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRTtRQUNqQyxPQUFPLElBQUEseUNBQW1CLEVBQUMsOENBQThDLENBQUMsQ0FBQztJQUU3RSxNQUFNLFFBQVEsR0FBRyw4QkFDZixJQUFJLEVBQUUsNEJBQWMsQ0FBQyxNQUFNLElBQ3hCLG1CQUFtQixHQUNuQixNQUFNLENBQ2MsQ0FBQztJQUUxQixPQUFPLElBQUEsNkJBQWlCLEVBQUMsUUFBUSxDQUFvQixDQUFDO0FBQ3hELENBQUM7QUF0QkQsMENBc0JDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQzlCLE1BQThCO0lBRTlCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRTtRQUNqQyxPQUFPLElBQUEseUNBQW1CLEVBQUMsOENBQThDLENBQUMsQ0FBQztJQUU3RSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssRUFBRTtRQUM1QixPQUFPLElBQUEseUNBQW1CLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUV6RCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFDakMsT0FBTyxJQUFBLHlDQUFtQixFQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFFN0UsTUFBTSxRQUFRLEdBQUcsOEJBQ2YsSUFBSSxFQUFFLDRCQUFjLENBQUMsT0FBTyxJQUN6QixtQkFBbUIsR0FDbkIsTUFBTSxDQUNlLENBQUM7SUFFM0IsT0FBTyxJQUFBLDZCQUFpQixFQUFDLFFBQVEsQ0FBcUIsQ0FBQztBQUN6RCxDQUFDO0FBbkJELDRDQW1CQyJ9