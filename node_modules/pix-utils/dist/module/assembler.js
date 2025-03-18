import fetchPayload from './dynamicPayload';
import { createEmv } from './emvHandler';
import { PixElementType } from './types/pixElements';
import { toBase64 } from './utils/qrcodeGenerator';
function generateThrowFn(obj) {
    return () => ({
        ...obj,
        throwIfError: () => obj,
    });
}
export function generatePixObject(elements) {
    if (elements.type === PixElementType.INVALID) {
        throw new Error('Invalid Pix type');
    }
    const emvCode = createEmv(elements);
    const generatedObject = {
        ...elements,
        toBRCode: () => emvCode,
        toImage: () => toBase64(emvCode),
        ...(elements.type === PixElementType.DYNAMIC
            ? {
                fetchPayload: ({ DPP, codMun }) => fetchPayload({ url: elements.url, DPP, codMun }),
            }
            : {}),
    };
    return {
        ...generatedObject,
        throwIfError: generateThrowFn(generatedObject),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2VtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBYyxjQUFjLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbkQsU0FBUyxlQUFlLENBQ3RCLEdBQWtCO0lBRWxCLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNaLEdBQUcsR0FBRztRQUNOLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0tBQ3hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLFFBQXVCO0lBRXZCLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFO1FBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNyQztJQUVELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxNQUFNLGVBQWUsR0FBRztRQUN0QixHQUFHLFFBQVE7UUFDWCxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTztRQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsT0FBTztZQUMxQyxDQUFDLENBQUM7Z0JBQ0UsWUFBWSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUNoQyxZQUFZLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDbkQ7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ1IsQ0FBQztJQUVGLE9BQU87UUFDTCxHQUFHLGVBQWU7UUFDbEIsWUFBWSxFQUFFLGVBQWUsQ0FBSSxlQUFlLENBQUM7S0FDbEQsQ0FBQztBQUNKLENBQUMifQ==