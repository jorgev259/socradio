"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = require("token-types");
const FourCC_1 = require("../common/FourCC");
/**
 * DSDIFF chunk header
 * The data-size encoding is deviating from EA-IFF 85
 * Ref: http://www.sonicstudio.com/pdf/dsd/DSDIFF_1.5_Spec.pdf
 */
exports.ChunkHeader = {
    len: 12,
    get: (buf, off) => {
        return {
            // Group-ID
            chunkID: FourCC_1.FourCcToken.get(buf, off),
            // Size
            chunkSize: Token.INT64_BE.get(buf, off + 4)
        };
    }
};
//# sourceMappingURL=DsdiffToken.js.map