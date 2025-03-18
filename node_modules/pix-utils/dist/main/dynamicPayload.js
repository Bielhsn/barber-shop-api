"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const buffer_1 = require("buffer");
const generateErrorObject_1 = require("./utils/generateErrorObject");
const zeroPad_1 = __importDefault(require("./utils/zeroPad"));
async function fetchPayload({ url, DPP = new Date().toISOString().substring(0, 10), codMun = 5300108, }) {
    const axiosOptions = {
        params: {
            DPP,
            codMun: (0, zeroPad_1.default)(codMun, 7),
        },
    };
    return axios_1.default
        .get('https://' + url, axiosOptions)
        .then(({ data, status }) => {
        if (status !== 200)
            return (0, generateErrorObject_1.generateErrorObject)('Status != 200');
        return data;
    })
        .then((jws) => {
        const parts = jws.split('.').map((b64) => buffer_1.Buffer.from(b64, 'base64'));
        const pixFetch = {
            jwsString: jws,
            jws: {
                hdr: parts[0],
                payload: parts[1],
                signature: parts[2],
            },
            header: JSON.parse(parts[0].toString()),
            payload: JSON.parse(parts[1].toString()),
        };
        return pixFetch;
    })
        .catch((error) => {
        return (0, generateErrorObject_1.generateErrorObject)(error.message);
    });
}
exports.default = fetchPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY1BheWxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZHluYW1pY1BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBaUU7QUFDakUsbUNBQWdDO0FBR2hDLHFFQUFrRTtBQUNsRSw4REFBc0M7QUFtQnZCLEtBQUssVUFBVSxZQUFZLENBQUMsRUFDekMsR0FBRyxFQUNILEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQy9DLE1BQU0sR0FBRyxPQUFPLEdBQ0Q7SUFDZixNQUFNLFlBQVksR0FBdUI7UUFDdkMsTUFBTSxFQUFFO1lBQ04sR0FBRztZQUNILE1BQU0sRUFBRSxJQUFBLGlCQUFPLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMzQjtLQUNGLENBQUM7SUFDRixPQUFPLGVBQUs7U0FDVCxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxZQUFZLENBQUM7U0FDbkMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFpQixFQUFFLEVBQUU7UUFDeEMsSUFBSSxNQUFNLEtBQUssR0FBRztZQUFFLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sUUFBUSxHQUFvQjtZQUNoQyxTQUFTLEVBQUUsR0FBRztZQUNkLEdBQUcsRUFBRTtnQkFDSCxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakIsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDcEI7WUFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFlO1NBQ3ZELENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNmLE9BQU8sSUFBQSx5Q0FBbUIsRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBbENELCtCQWtDQyJ9