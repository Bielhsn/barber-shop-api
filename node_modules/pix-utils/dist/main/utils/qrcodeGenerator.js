"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
const qrcode_1 = require("qrcode");
async function toBase64(brCode) {
    return (0, qrcode_1.toDataURL)(brCode);
}
exports.toBase64 = toBase64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXJjb2RlR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3FyY29kZUdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFNUIsS0FBSyxVQUFVLFFBQVEsQ0FBQyxNQUFjO0lBQzNDLE9BQU8sSUFBQSxrQkFBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFGRCw0QkFFQyJ9