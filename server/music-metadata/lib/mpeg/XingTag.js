"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = require("token-types");
/**
 * Info Tag: Xing, LAME
 */
exports.InfoTagHeaderTag = new Token.StringType(4, 'ascii');
/**
 * LAME TAG value
 * Did not find any official documentation for this
 * Value e.g.: "3.98.4"
 */
exports.LameEncoderVersion = new Token.StringType(6, 'ascii');
/**
 * Info Tag
 * Ref: http://gabriel.mp3-tech.org/mp3infotag.html
 */
exports.XingInfoTag = {
    len: 136,
    get: (buf, off) => {
        return {
            // === ZONE A - Traditional Xing VBR Tag data ===
            // 4 bytes for HeaderFlags
            headerFlags: new Token.BufferType(4).get(buf, off),
            numFrames: Token.UINT32_BE.get(buf, off + 4),
            streamSize: Token.UINT32_BE.get(buf, off + 8),
            // the number of header data bytes (from original file)
            vbrScale: Token.UINT32_BE.get(buf, off + 112),
            /**
             * LAME Tag, extends the Xing header format
             * First added in LAME 3.12 for VBR
             * The modified header is also included in CBR files (effective LAME 3.94), with "Info" instead of "XING" near the beginning.
             */
            // === ZONE B - Initial LAME info  ===
            //  Initial LAME info, e.g.: LAME3.99r
            codec: new Token.StringType(9, 'ascii').get(buf, off + 116),
            // 	 Info tag revision
            infoTagRevision: Token.UINT8.get(buf, off + 125) >> 4,
            // VBR method
            vbrMethod: Token.UINT8.get(buf, off + 125) & 0xf // $A5
        };
    }
};
//# sourceMappingURL=XingTag.js.map