"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = require("token-types");
const ID3v2Token_1 = require("../../id3v2/ID3v2Token");
/**
 * Parse the METADATA_BLOCK_PICTURE
 * Ref: https://wiki.xiph.org/VorbisComment#METADATA_BLOCK_PICTURE
 * Ref: https://xiph.org/flac/format.html#metadata_block_picture
 * // ToDo: move to ID3 / APIC?
 */
class VorbisPictureToken {
    constructor(len) {
        this.len = len;
    }
    static fromBase64(base64str) {
        return this.fromBuffer(Buffer.from(base64str, 'base64'));
    }
    static fromBuffer(buffer) {
        const pic = new VorbisPictureToken(buffer.length);
        return pic.get(buffer, 0);
    }
    get(buffer, offset) {
        const type = ID3v2Token_1.AttachedPictureType[Token.UINT32_BE.get(buffer, offset)];
        const mimeLen = Token.UINT32_BE.get(buffer, offset += 4);
        const format = buffer.toString('utf-8', offset += 4, offset + mimeLen);
        const descLen = Token.UINT32_BE.get(buffer, offset += mimeLen);
        const description = buffer.toString('utf-8', offset += 4, offset + descLen);
        const width = Token.UINT32_BE.get(buffer, offset += descLen);
        const height = Token.UINT32_BE.get(buffer, offset += 4);
        const colour_depth = Token.UINT32_BE.get(buffer, offset += 4);
        const indexed_color = Token.UINT32_BE.get(buffer, offset += 4);
        const picDataLen = Token.UINT32_BE.get(buffer, offset += 4);
        const data = Buffer.from(buffer.slice(offset += 4, offset + picDataLen));
        return {
            type,
            format,
            description,
            width,
            height,
            colour_depth,
            indexed_color,
            data
        };
    }
}
exports.VorbisPictureToken = VorbisPictureToken;
/**
 * Comment header decoder
 * Ref: https://xiph.org/vorbis/doc/Vorbis_I_spec.html#x1-620004.2.1
 */
exports.CommonHeader = {
    len: 7,
    get: (buf, off) => {
        return {
            packetType: buf.readUInt8(off),
            vorbis: new Token.StringType(6, 'ascii').get(buf, off + 1)
        };
    }
};
/**
 * Identification header decoder
 * Ref: https://xiph.org/vorbis/doc/Vorbis_I_spec.html#x1-630004.2.2
 */
exports.IdentificationHeader = {
    len: 23,
    get: (buf, off) => {
        return {
            version: buf.readUInt32LE(off + 0),
            channelMode: buf.readUInt8(off + 4),
            sampleRate: buf.readUInt32LE(off + 5),
            bitrateMax: buf.readUInt32LE(off + 9),
            bitrateNominal: buf.readUInt32LE(off + 13),
            bitrateMin: buf.readUInt32LE(off + 17)
        };
    }
};
//# sourceMappingURL=Vorbis.js.map