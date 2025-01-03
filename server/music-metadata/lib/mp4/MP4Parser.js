"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initDebug = require("debug");
const Token = require("token-types");
const BasicParser_1 = require("../common/BasicParser");
const Atom_1 = require("./Atom");
const AtomToken = require("./AtomToken");
const ID3v1Parser_1 = require("../id3v1/ID3v1Parser");
const debug = initDebug('music-metadata:parser:MP4');
const tagFormat = 'iTunes';
const encoderDict = {
    raw: {
        lossy: false,
        format: 'raw'
    },
    MAC3: {
        lossy: true,
        format: 'MACE 3:1'
    },
    MAC6: {
        lossy: true,
        format: 'MACE 6:1'
    },
    ima4: {
        lossy: true,
        format: 'IMA 4:1'
    },
    ulaw: {
        lossy: true,
        format: 'uLaw 2:1'
    },
    alaw: {
        lossy: true,
        format: 'uLaw 2:1'
    },
    Qclp: {
        lossy: true,
        format: 'QUALCOMM PureVoice'
    },
    '.mp3': {
        lossy: true,
        format: 'MPEG-1 layer 3'
    },
    alac: {
        lossy: false,
        format: 'ALAC'
    },
    'ac-3': {
        lossy: true,
        format: 'AC-3'
    },
    mp4a: {
        lossy: true,
        format: 'MPEG-4/AAC'
    },
    mp4s: {
        lossy: true,
        format: 'MP4S'
    },
    // Closed Captioning Media, https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFChap3/qtff3.html#//apple_ref/doc/uid/TP40000939-CH205-SW87
    c608: {
        lossy: true,
        format: 'CEA-608'
    },
    c708: {
        lossy: true,
        format: 'CEA-708'
    }
};
function distinct(value, index, self) {
    return self.indexOf(value) === index;
}
/*
 * Parser for ISO base media file format (ISO/IEC 14496-12 – MPEG-4 Part 12), supporting:
 * - QuickTime container
 * - MP4 File Format
 * - 3GPP file format
 * - 3GPP2 file format
 *
 * MPEG-4 Audio / Part 3 (.m4a)& MPEG 4 Video (m4v, mp4) extension.
 * Support for Apple iTunes tags as found in a M4A/M4V files.
 * Ref:
 *   https://en.wikipedia.org/wiki/ISO_base_media_file_format
 *   https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/Metadata/Metadata.html
 *   http://atomicparsley.sourceforge.net/mpeg-4files.html
 *   https://github.com/sergiomb2/libmp4v2/wiki/iTunesMetadata
 *   https://wiki.multimedia.cx/index.php/QuickTime_container
 */
class MP4Parser extends BasicParser_1.BasicParser {
    static read_BE_Signed_Integer(value) {
        return Token.readIntBE(value, 0, value.length);
    }
    static read_BE_Unsigned_Integer(value) {
        return Token.readUIntBE(value, 0, value.length);
    }
    async parse() {
        this.formatList = [];
        let remainingFileSize = this.tokenizer.fileSize;
        const rootAtoms = [];
        while (remainingFileSize > 0) {
            try {
                await this.tokenizer.peekToken(AtomToken.Header);
            }
            catch (error) {
                const errMsg = `Error at offset=${this.tokenizer.position}: ${error.message}`;
                debug(errMsg);
                this.addWarning(errMsg);
                break;
            }
            const rootAtom = await Atom_1.Atom.readAtom(this.tokenizer, atom => this.handleAtom(atom), null);
            rootAtoms.push(rootAtom);
            remainingFileSize -= rootAtom.header.length;
        }
        this.metadata.setFormat('codec', this.formatList.filter(distinct).join('+'));
    }
    async handleAtom(atom) {
        if (atom.parent) {
            switch (atom.parent.header.name) {
                case 'ilst':
                case '<id>':
                    return this.parseMetadataItemData(atom);
                case 'stbl': // The Sample Table Atom
                    switch (atom.header.name) {
                        case 'stsd': // sample descriptions
                            return this.parseAtom_stsd(atom.dataLen);
                        default:
                            debug(`Ignore: stbl/${atom.header.name} atom`);
                    }
                    break;
            }
        }
        switch (atom.header.name) {
            case 'ftyp':
                const types = await this.parseAtom_ftyp(atom.dataLen);
                debug(`ftyp: ${types.join('/')}`);
                const x = types.filter(distinct).join('/');
                this.metadata.setFormat('container', x);
                return;
            case 'mdhd': // Media header atom
                return this.parseAtom_mdhd(atom);
            case 'mvhd': // 'movie' => 'mvhd': movie header atom; child of Movie Atom
                return this.parseAtom_mvhd(atom);
            case 'mdat': // media data atom:
                this.audioLengthInBytes = atom.dataLen;
                this.calculateBitRate();
                break;
        }
        await this.tokenizer.ignore(atom.dataLen);
        debug(`Ignore atom data: path=${atom.atomPath}, payload-len=${atom.dataLen}`);
    }
    calculateBitRate() {
        if (this.audioLengthInBytes && this.metadata.format.duration) {
            this.metadata.setFormat('bitrate', 8 * this.audioLengthInBytes / this.metadata.format.duration);
        }
    }
    addTag(id, value) {
        this.metadata.addTag(tagFormat, id, value);
    }
    addWarning(message) {
        debug('Warning: ' + message);
        this.metadata.addWarning(message);
    }
    /**
     * Parse data of Meta-item-list-atom (item of 'ilst' atom)
     * @param metaAtom
     * Ref: https://developer.apple.com/library/content/documentation/QuickTime/QTFF/Metadata/Metadata.html#//apple_ref/doc/uid/TP40000939-CH1-SW8
     */
    parseMetadataItemData(metaAtom) {
        let tagKey = metaAtom.header.name;
        return metaAtom.readAtoms(this.tokenizer, async (child) => {
            switch (child.header.name) {
                case 'data': // value atom
                    return this.parseValueAtom(tagKey, child);
                case 'name': // name atom (optional)
                    const name = await this.tokenizer.readToken(new AtomToken.NameAtom(child.dataLen));
                    tagKey += ':' + name.name;
                    break;
                case 'mean': // name atom (optional)
                    const mean = await this.tokenizer.readToken(new AtomToken.NameAtom(child.dataLen));
                    // console.log("  %s[%s] = %s", tagKey, header.name, mean.name);
                    tagKey += ':' + mean.name;
                    break;
                default:
                    const dataAtom = await this.tokenizer.readToken(new Token.BufferType(child.dataLen));
                    this.addWarning('Unsupported meta-item: ' + tagKey + '[' + child.header.name + '] => value=' + dataAtom.toString('hex') + ' ascii=' + dataAtom.toString('ascii'));
            }
        }, metaAtom.dataLen);
    }
    async parseValueAtom(tagKey, metaAtom) {
        const dataAtom = await this.tokenizer.readToken(new AtomToken.DataAtom(metaAtom.header.length - AtomToken.Header.len));
        if (dataAtom.type.set !== 0) {
            throw new Error('Unsupported type-set != 0: ' + dataAtom.type.set);
        }
        // Use well-known-type table
        // Ref: https://developer.apple.com/library/content/documentation/QuickTime/QTFF/Metadata/Metadata.html#//apple_ref/doc/uid/TP40000939-CH1-SW35
        switch (dataAtom.type.type) {
            case 0: // reserved: Reserved for use where no type needs to be indicated
                switch (tagKey) {
                    case 'trkn':
                    case 'disk':
                        const num = Token.UINT8.get(dataAtom.value, 3);
                        const of = Token.UINT8.get(dataAtom.value, 5);
                        // console.log("  %s[data] = %s/%s", tagKey, num, of);
                        this.addTag(tagKey, num + '/' + of);
                        break;
                    case 'gnre':
                        const genreInt = Token.UINT8.get(dataAtom.value, 1);
                        const genreStr = ID3v1Parser_1.Genres[genreInt - 1];
                        // console.log("  %s[data] = %s", tagKey, genreStr);
                        this.addTag(tagKey, genreStr);
                        break;
                    default:
                    // console.log("  reserved-data: name=%s, len=%s, set=%s, type=%s, locale=%s, value{ hex=%s, ascii=%s }",
                    // header.name, header.length, dataAtom.type.set, dataAtom.type.type, dataAtom.locale, dataAtom.value.toString('hex'), dataAtom.value.toString('ascii'));
                }
                break;
            case 1: // UTF-8: Without any count or NULL terminator
            case 18: // Unknown: Found in m4b in combination with a '©gen' tag
                this.addTag(tagKey, dataAtom.value.toString('utf-8'));
                break;
            case 13: // JPEG
                if (this.options.skipCovers)
                    break;
                this.addTag(tagKey, {
                    format: 'image/jpeg',
                    data: Buffer.from(dataAtom.value)
                });
                break;
            case 14: // PNG
                if (this.options.skipCovers)
                    break;
                this.addTag(tagKey, {
                    format: 'image/png',
                    data: Buffer.from(dataAtom.value)
                });
                break;
            case 21: // BE Signed Integer
                this.addTag(tagKey, MP4Parser.read_BE_Signed_Integer(dataAtom.value));
                break;
            case 22: // BE Unsigned Integer
                this.addTag(tagKey, MP4Parser.read_BE_Unsigned_Integer(dataAtom.value));
                break;
            case 65: // An 8-bit signed integer
                this.addTag(tagKey, dataAtom.value.readInt8(0));
                break;
            case 66: // A big-endian 16-bit signed integer
                this.addTag(tagKey, dataAtom.value.readInt16BE(0));
                break;
            case 67: // A big-endian 32-bit signed integer
                this.addTag(tagKey, dataAtom.value.readInt32BE(0));
                break;
            default:
                this.addWarning(`atom key=${tagKey}, has unknown well-known-type (data-type): ${dataAtom.type.type}`);
        }
    }
    /**
     * Parse movie header (mvhd) atom
     * @param mvhd mvhd atom
     */
    async parseAtom_mvhd(mvhd) {
        const mvhd_data = await this.tokenizer.readToken(new AtomToken.MvhdAtom(mvhd.dataLen));
        this.parse_mxhd(mvhd_data);
    }
    /**
     * Parse media header (mdhd) atom
     * @param mdhd mdhd atom
     */
    async parseAtom_mdhd(mdhd) {
        const mdhd_data = await this.tokenizer.readToken(new AtomToken.MdhdAtom(mdhd.dataLen));
        this.parse_mxhd(mdhd_data);
    }
    parse_mxhd(mxhd) {
        if (mxhd.timeScale) {
            // this.metadata.setFormat('sampleRate', mxhd.timeScale);
            if (!this.metadata.format.duration) {
                const duration = (mxhd.duration / mxhd.timeScale);
                this.metadata.setFormat('duration', duration); // calculate duration in seconds
                this.calculateBitRate();
            }
        }
    }
    /**
     * Parse sample table atom (stbl) atom
     * @param len
     */
    async parseAtom_stbl(len) {
        const ftype = await this.tokenizer.readToken(AtomToken.ftyp);
        len -= AtomToken.ftyp.len;
        if (len > 0) {
            const types = await this.parseAtom_ftyp(len);
            const value = ftype.type.replace(/\W/g, '');
            if (value.length > 0) {
                types.push(value);
            }
            return types;
        }
        return [];
    }
    async parseAtom_ftyp(len) {
        const ftype = await this.tokenizer.readToken(AtomToken.ftyp);
        len -= AtomToken.ftyp.len;
        if (len > 0) {
            const types = await this.parseAtom_ftyp(len);
            const value = ftype.type.replace(/\W/g, '');
            if (value.length > 0) {
                types.push(value);
            }
            return types;
        }
        return [];
    }
    /**
     * Parse sample description atom
     * @param len
     */
    async parseAtom_stsd(len) {
        const stsd = await this.tokenizer.readToken(new AtomToken.StsdAtom(len));
        const formatList = [];
        for (const dfEntry of stsd.table) {
            const encoderInfo = encoderDict[dfEntry.dataFormat];
            if (encoderInfo) {
                this.parseSoundSampleDescription(dfEntry);
                this.metadata.setFormat('lossless', !encoderInfo.lossy);
                formatList.push(encoderInfo.format);
            }
            else {
                debug(`Warning: data-format '${dfEntry.dataFormat}' missing in MP4Parser.encoderDict`);
            }
        }
        if (formatList.length > 0) {
            this.formatList.push(formatList.join('/'));
        }
    }
    /**
     * @param sampleDescription
     * Ref: https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFChap3/qtff3.html#//apple_ref/doc/uid/TP40000939-CH205-128916
     */
    parseSoundSampleDescription(sampleDescription) {
        let offset = 0;
        const version = AtomToken.SoundSampleDescriptionVersion.get(sampleDescription.description, offset);
        offset += AtomToken.SoundSampleDescriptionVersion.len;
        if (version.version === 0 || version.version === 1) {
            // Sound Sample Description (Version 0)
            const description = AtomToken.SoundSampleDescriptionV0.get(sampleDescription.description, offset);
            this.metadata.setFormat('sampleRate', description.sampleRate);
            this.metadata.setFormat('bitsPerSample', description.sampleSize);
            this.metadata.setFormat('numberOfChannels', description.numAudioChannels);
        }
        else {
            debug(`Warning: sound-sample-description ${version} not implemented`);
        }
    }
}
exports.MP4Parser = MP4Parser;
//# sourceMappingURL=MP4Parser.js.map