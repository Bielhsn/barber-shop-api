export var EmvSchema;
(function (EmvSchema) {
    EmvSchema[EmvSchema["TAG_INIT"] = 0] = "TAG_INIT";
    EmvSchema[EmvSchema["TAG_ONETIME"] = 1] = "TAG_ONETIME";
    EmvSchema[EmvSchema["TAG_MAI"] = 26] = "TAG_MAI";
    EmvSchema[EmvSchema["TAG_MCC"] = 52] = "TAG_MCC";
    EmvSchema[EmvSchema["TAG_TRANSACTION_CURRENCY"] = 53] = "TAG_TRANSACTION_CURRENCY";
    EmvSchema[EmvSchema["TAG_TRANSACTION_AMOUNT"] = 54] = "TAG_TRANSACTION_AMOUNT";
    EmvSchema[EmvSchema["TAG_COUNTRY_CODE"] = 58] = "TAG_COUNTRY_CODE";
    EmvSchema[EmvSchema["TAG_MERCHANT_NAME"] = 59] = "TAG_MERCHANT_NAME";
    EmvSchema[EmvSchema["TAG_MERCHANT_CITY"] = 60] = "TAG_MERCHANT_CITY";
    EmvSchema[EmvSchema["TAG_ADDITIONAL_DATA"] = 62] = "TAG_ADDITIONAL_DATA";
    EmvSchema[EmvSchema["TAG_CRC"] = 63] = "TAG_CRC";
})(EmvSchema || (EmvSchema = {}));
export var EmvAdditionalDataSchema;
(function (EmvAdditionalDataSchema) {
    EmvAdditionalDataSchema[EmvAdditionalDataSchema["TAG_TXID"] = 5] = "TAG_TXID";
})(EmvAdditionalDataSchema || (EmvAdditionalDataSchema = {}));
export var EmvMaiSchema;
(function (EmvMaiSchema) {
    EmvMaiSchema[EmvMaiSchema["TAG_MAI_GUI"] = 0] = "TAG_MAI_GUI";
    EmvMaiSchema[EmvMaiSchema["TAG_MAI_PIXKEY"] = 1] = "TAG_MAI_PIXKEY";
    EmvMaiSchema[EmvMaiSchema["TAG_MAI_INFO_ADD"] = 2] = "TAG_MAI_INFO_ADD";
    EmvMaiSchema[EmvMaiSchema["TAG_MAI_FSS"] = 3] = "TAG_MAI_FSS";
    EmvMaiSchema[EmvMaiSchema["TAG_MAI_URL"] = 25] = "TAG_MAI_URL";
    EmvMaiSchema["BC_GUI"] = "br.gov.bcb.pix";
})(EmvMaiSchema || (EmvMaiSchema = {}));
export var EmvMandatory;
(function (EmvMandatory) {
    EmvMandatory[EmvMandatory["TAG_MCC"] = 52] = "TAG_MCC";
    EmvMandatory[EmvMandatory["TAG_TRANSACTION_CURRENCY"] = 53] = "TAG_TRANSACTION_CURRENCY";
    EmvMandatory[EmvMandatory["TAG_COUNTRY_CODE"] = 58] = "TAG_COUNTRY_CODE";
    EmvMandatory[EmvMandatory["TAG_MERCHANT_NAME"] = 59] = "TAG_MERCHANT_NAME";
    EmvMandatory[EmvMandatory["TAG_MERCHANT_CITY"] = 60] = "TAG_MERCHANT_CITY";
})(EmvMandatory || (EmvMandatory = {}));
export var TagsWithSubTags;
(function (TagsWithSubTags) {
    TagsWithSubTags[TagsWithSubTags["TAG_MAI"] = 26] = "TAG_MAI";
    TagsWithSubTags[TagsWithSubTags["TAG_ADDITIONAL_DATA"] = 62] = "TAG_ADDITIONAL_DATA";
})(TagsWithSubTags || (TagsWithSubTags = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl4RW12U2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3R5cGVzL3BpeEVtdlNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQU4sSUFBWSxTQVlYO0FBWkQsV0FBWSxTQUFTO0lBQ25CLGlEQUFZLENBQUE7SUFDWix1REFBZSxDQUFBO0lBQ2YsZ0RBQVksQ0FBQTtJQUNaLGdEQUFZLENBQUE7SUFDWixrRkFBNkIsQ0FBQTtJQUM3Qiw4RUFBMkIsQ0FBQTtJQUMzQixrRUFBcUIsQ0FBQTtJQUNyQixvRUFBc0IsQ0FBQTtJQUN0QixvRUFBc0IsQ0FBQTtJQUN0Qix3RUFBd0IsQ0FBQTtJQUN4QixnREFBWSxDQUFBO0FBQ2QsQ0FBQyxFQVpXLFNBQVMsS0FBVCxTQUFTLFFBWXBCO0FBRUQsTUFBTSxDQUFOLElBQVksdUJBRVg7QUFGRCxXQUFZLHVCQUF1QjtJQUNqQyw2RUFBWSxDQUFBO0FBQ2QsQ0FBQyxFQUZXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFFbEM7QUFFRCxNQUFNLENBQU4sSUFBWSxZQU9YO0FBUEQsV0FBWSxZQUFZO0lBQ3RCLDZEQUFlLENBQUE7SUFDZixtRUFBa0IsQ0FBQTtJQUNsQix1RUFBb0IsQ0FBQTtJQUNwQiw2REFBZSxDQUFBO0lBQ2YsOERBQWdCLENBQUE7SUFDaEIseUNBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQVBXLFlBQVksS0FBWixZQUFZLFFBT3ZCO0FBRUQsTUFBTSxDQUFOLElBQVksWUFNWDtBQU5ELFdBQVksWUFBWTtJQUN0QixzREFBMkIsQ0FBQTtJQUMzQix3RkFBNkQsQ0FBQTtJQUM3RCx3RUFBNkMsQ0FBQTtJQUM3QywwRUFBK0MsQ0FBQTtJQUMvQywwRUFBK0MsQ0FBQTtBQUNqRCxDQUFDLEVBTlcsWUFBWSxLQUFaLFlBQVksUUFNdkI7QUFFRCxNQUFNLENBQU4sSUFBWSxlQUdYO0FBSEQsV0FBWSxlQUFlO0lBQ3pCLDREQUEyQixDQUFBO0lBQzNCLG9GQUFtRCxDQUFBO0FBQ3JELENBQUMsRUFIVyxlQUFlLEtBQWYsZUFBZSxRQUcxQiJ9