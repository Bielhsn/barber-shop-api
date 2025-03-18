import { PixElementType, } from './types/pixElements';
import { EmvMaiSchema, EmvSchema } from './types/pixEmvSchema';
export function isPix(emvElements, test) {
    if (!emvElements.getTag(EmvSchema.TAG_MAI))
        return false;
    const isDynamic = emvElements.getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI);
    const isStatic = emvElements.getSubTag(EmvMaiSchema.TAG_MAI_PIXKEY, EmvSchema.TAG_MAI);
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
export function hasError(pixElement) {
    return !!pixElement.error;
}
export function hasElementError(pixElement) {
    return !!pixElement.error;
}
export function isStaticPix(pixElement) {
    return pixElement && pixElement.type === PixElementType.STATIC;
}
export function isDynamicPix(pixElement) {
    return pixElement && pixElement.type === PixElementType.DYNAMIC;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGNBQWMsR0FHZixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFHMUUsTUFBTSxVQUFVLEtBQUssQ0FDbkIsV0FBc0IsRUFDdEIsSUFBNEM7SUFFNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXpELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQ3JDLFlBQVksQ0FBQyxXQUFXLEVBQ3hCLFNBQVMsQ0FBQyxPQUFPLENBQ2xCLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUNwQyxZQUFZLENBQUMsY0FBYyxFQUMzQixTQUFTLENBQUMsT0FBTyxDQUNsQixDQUFDO0lBRUYsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLEtBQUs7WUFDUixPQUFPLElBQUksQ0FBQztRQUNkLEtBQUssT0FBTztZQUNWLE9BQU8sQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ25DLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNwQixLQUFLLFNBQVM7WUFDWixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDckI7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUN0QixVQUFpQztJQUVqQyxPQUFPLENBQUMsQ0FBRSxVQUF1QixDQUFDLEtBQUssQ0FBQztBQUMxQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsVUFBa0M7SUFFbEMsT0FBTyxDQUFDLENBQUUsVUFBdUIsQ0FBQyxLQUFLLENBQUM7QUFDMUMsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQ3pCLFVBQXNCO0lBRXRCLE9BQU8sVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNqRSxDQUFDO0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FDMUIsVUFBc0I7SUFFdEIsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsT0FBTyxDQUFDO0FBQ2xFLENBQUMifQ==