"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Token = require("token-types");
const initDebug = require("debug");
const FourCC_1 = require("../common/FourCC");
const BasicParser_1 = require("../common/BasicParser");
const ID3Stream_1 = require("../id3v2/ID3Stream");
const DsdiffToken_1 = require("./DsdiffToken");
const strtok3 = require("strtok3/lib/core");
const ID3v2Parser_1 = require("../id3v2/ID3v2Parser");
const debug = initDebug('music-metadata:parser:aiff');
/**
 * DSDIFF - Direct Stream Digital Interchange File Format (Phillips)
 *
 * Ref:
 *  http://www.sonicstudio.com/pdf/dsd/DSDIFF_1.5_Spec.pdf
 */
class DsdiffParser extends BasicParser_1.BasicParser {
    async parse() {
        const header = await this.tokenizer.readToken(DsdiffToken_1.ChunkHeader);
        assert.strictEqual(header.chunkID, 'FRM8');
        const type = (await this.tokenizer.readToken(FourCC_1.FourCcToken)).trim();
        switch (type) {
            case 'DSD':
                this.metadata.setFormat('container', `DSDIFF/${type}`);
                this.metadata.setFormat('lossless', true);
                return this.readFmt8Chunks(header.chunkSize - FourCC_1.FourCcToken.len);
            default:
                throw Error(`Unsupported DSDIFF type: ${type}`);
        }
    }
    async readFmt8Chunks(remainingSize) {
        while (remainingSize >= DsdiffToken_1.ChunkHeader.len) {
            const chunkHeader = await this.tokenizer.readToken(DsdiffToken_1.ChunkHeader);
            //  If the data is an odd number of bytes in length, a pad byte must be added at the end
            debug(`Chunk id=${chunkHeader.chunkID}`);
            await this.readData(chunkHeader);
            remainingSize -= (DsdiffToken_1.ChunkHeader.len + chunkHeader.chunkSize);
        }
    }
    async readData(header) {
        debug(`Reading data of chunk[ID=${header.chunkID}, size=${header.chunkSize}]`);
        const p0 = this.tokenizer.position;
        switch (header.chunkID.trim()) {
            case 'FVER': // 3.1 FORMAT VERSION CHUNK
                const version = await this.tokenizer.readToken(Token.UINT32_LE);
                debug(`DSDIFF version=${version}`);
                break;
            case 'PROP': // 3.2 PROPERTY CHUNK
                const propType = await this.tokenizer.readToken(FourCC_1.FourCcToken);
                assert.strictEqual(propType, 'SND ');
                await this.handleSoundPropertyChunks(header.chunkSize - FourCC_1.FourCcToken.len);
                break;
            case 'ID3': // Unofficial ID3 tag support
                const id3_data = await this.tokenizer.readToken(new Token.BufferType(header.chunkSize));
                const id3stream = new ID3Stream_1.ID3Stream(id3_data);
                const rst = strtok3.fromStream(id3stream);
                await new ID3v2Parser_1.ID3v2Parser().parse(this.metadata, rst, this.options);
                break;
            default:
                debug(`Ignore chunk[ID=${header.chunkID}, size=${header.chunkSize}]`);
                break;
            case 'DSD':
                this.metadata.setFormat('numberOfSamples', header.chunkSize * 8 / this.metadata.format.numberOfChannels);
                this.metadata.setFormat('duration', this.metadata.format.numberOfSamples / this.metadata.format.sampleRate);
                break;
        }
        const remaining = header.chunkSize - (this.tokenizer.position - p0);
        if (remaining > 0) {
            debug(`After Parsing chunk, remaining ${remaining} bytes`);
            await this.tokenizer.ignore(remaining);
        }
    }
    async handleSoundPropertyChunks(remainingSize) {
        debug(`Parsing sound-property-chunks, remainingSize=${remainingSize}`);
        while (remainingSize > 0) {
            const sndPropHeader = await this.tokenizer.readToken(DsdiffToken_1.ChunkHeader);
            debug(`Sound-property-chunk[ID=${sndPropHeader.chunkID}, size=${sndPropHeader.chunkSize}]`);
            const p0 = this.tokenizer.position;
            switch (sndPropHeader.chunkID.trim()) {
                case 'FS': // 3.2.1 Sample Rate Chunk
                    const sampleRate = await this.tokenizer.readToken(Token.UINT32_BE);
                    this.metadata.setFormat('sampleRate', sampleRate);
                    break;
                case 'CHNL': // 3.2.2 Channels Chunk
                    const numChannels = await this.tokenizer.readToken(Token.UINT16_BE);
                    this.metadata.setFormat('numberOfChannels', numChannels);
                    await this.handleChannelChunks(sndPropHeader.chunkSize - Token.UINT16_BE.len);
                    break;
                case 'CMPR': // 3.2.3 Compression Type Chunk
                    const compressionIdCode = (await this.tokenizer.readToken(FourCC_1.FourCcToken)).trim();
                    const count = await this.tokenizer.readToken(Token.UINT8);
                    const compressionName = await this.tokenizer.readToken(new Token.StringType(count, 'ascii'));
                    if (compressionIdCode === 'DSD') {
                        this.metadata.setFormat('lossless', true);
                        this.metadata.setFormat('bitsPerSample', 1);
                    }
                    this.metadata.setFormat('codec', `${compressionIdCode} (${compressionName})`);
                    break;
                case 'ABSS': // 3.2.4 Absolute Start Time Chunk
                    const hours = await this.tokenizer.readToken(Token.UINT16_BE);
                    const minutes = await this.tokenizer.readToken(Token.UINT8);
                    const seconds = await this.tokenizer.readToken(Token.UINT8);
                    const samples = await this.tokenizer.readToken(Token.UINT32_BE);
                    debug(`ABSS ${hours}:${minutes}:${seconds}.${samples}`);
                    break;
                case 'LSCO': // 3.2.5 Loudspeaker Configuration Chunk
                    const lsConfig = await this.tokenizer.readToken(Token.UINT16_BE);
                    debug(`LSCO lsConfig=${lsConfig}`);
                    break;
                case 'COMT':
                default:
                    debug(`Unknown sound-property-chunk[ID=${sndPropHeader.chunkID}, size=${sndPropHeader.chunkSize}]`);
                    await this.tokenizer.ignore(sndPropHeader.chunkSize);
            }
            const remaining = sndPropHeader.chunkSize - (this.tokenizer.position - p0);
            if (remaining > 0) {
                debug(`After Parsing sound-property-chunk ${sndPropHeader.chunkSize}, remaining ${remaining} bytes`);
                await this.tokenizer.ignore(remaining);
            }
            remainingSize -= DsdiffToken_1.ChunkHeader.len + sndPropHeader.chunkSize;
            debug(`Parsing sound-property-chunks, remainingSize=${remainingSize}`);
        }
        if (this.metadata.format.lossless && this.metadata.format.sampleRate && this.metadata.format.numberOfChannels && this.metadata.format.bitsPerSample) {
            const bitrate = this.metadata.format.sampleRate * this.metadata.format.numberOfChannels * this.metadata.format.bitsPerSample;
            this.metadata.setFormat('bitrate', bitrate);
        }
    }
    async handleChannelChunks(remainingSize) {
        debug(`Parsing channel-chunks, remainingSize=${remainingSize}`);
        const channels = [];
        while (remainingSize >= FourCC_1.FourCcToken.len) {
            const channelId = await this.tokenizer.readToken(FourCC_1.FourCcToken);
            debug(`Channel[ID=${channelId}]`);
            channels.push(channelId);
            remainingSize -= FourCC_1.FourCcToken.len;
        }
        debug(`Channels: ${channels.join(', ')}`);
        return channels;
    }
}
exports.DsdiffParser = DsdiffParser;
//# sourceMappingURL=DsdiffParser.js.map