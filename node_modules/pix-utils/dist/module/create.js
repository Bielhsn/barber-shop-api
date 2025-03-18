import { generatePixObject } from './assembler';
import { PixElementType, } from './types/pixElements';
import { generateErrorObject } from './utils/generateErrorObject';
const defaultPixFields = {
    merchantCategoryCode: '0000',
    transactionCurrency: '986',
    countryCode: 'BR',
};
const defaultStaticFields = {
    ...defaultPixFields,
    isTransactionUnique: false,
    txid: '***',
};
export function createStaticPix(params) {
    if (params.merchantName.length > 25)
        return generateErrorObject('merchantName character limit exceeded (> 25)');
    if (params.txid && params.txid.length > 25)
        return generateErrorObject('txid character limit exceeded (> 25)');
    if (params.merchantCity === '')
        return generateErrorObject('merchantCity is required');
    if (params.merchantCity.length > 15)
        return generateErrorObject('merchantCity character limit exceeded (> 15)');
    const elements = {
        type: PixElementType.STATIC,
        ...defaultStaticFields,
        ...params,
    };
    return generatePixObject(elements);
}
export function createDynamicPix(params) {
    if (params.merchantName.length > 25)
        return generateErrorObject('merchantName character limit exceeded (> 25)');
    if (params.merchantCity === '')
        return generateErrorObject('merchantCity is required');
    if (params.merchantCity.length > 15)
        return generateErrorObject('merchantCity character limit exceeded (> 15)');
    const elements = {
        type: PixElementType.DYNAMIC,
        ...defaultStaticFields,
        ...params,
    };
    return generatePixObject(elements);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLaEQsT0FBTyxFQUdMLGNBQWMsR0FHZixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWxFLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsb0JBQW9CLEVBQUUsTUFBTTtJQUM1QixtQkFBbUIsRUFBRSxLQUFLO0lBQzFCLFdBQVcsRUFBRSxJQUFJO0NBQ2xCLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLEdBQUcsZ0JBQWdCO0lBQ25CLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsSUFBSSxFQUFFLEtBQUs7Q0FDWixDQUFDO0FBRUYsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsTUFBNkI7SUFFN0IsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFO1FBQ2pDLE9BQU8sbUJBQW1CLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUU3RSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRTtRQUN4QyxPQUFPLG1CQUFtQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFFckUsSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLEVBQUU7UUFDNUIsT0FBTyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRXpELElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRTtRQUNqQyxPQUFPLG1CQUFtQixDQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFFN0UsTUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLEVBQUUsY0FBYyxDQUFDLE1BQU07UUFDM0IsR0FBRyxtQkFBbUI7UUFDdEIsR0FBRyxNQUFNO0tBQ2MsQ0FBQztJQUUxQixPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBb0IsQ0FBQztBQUN4RCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixNQUE4QjtJQUU5QixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFDakMsT0FBTyxtQkFBbUIsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBRTdFLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxFQUFFO1FBQzVCLE9BQU8sbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUV6RCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFDakMsT0FBTyxtQkFBbUIsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBRTdFLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1FBQzVCLEdBQUcsbUJBQW1CO1FBQ3RCLEdBQUcsTUFBTTtLQUNlLENBQUM7SUFFM0IsT0FBTyxpQkFBaUIsQ0FBQyxRQUFRLENBQXFCLENBQUM7QUFDekQsQ0FBQyJ9