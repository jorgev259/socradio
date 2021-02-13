import { BasicParser } from '../common/BasicParser';
import { Atom } from './Atom';
export declare class MP4Parser extends BasicParser {
    private static read_BE_Signed_Integer;
    private static read_BE_Unsigned_Integer;
    private formatList;
    private audioLengthInBytes;
    parse(): Promise<void>;
    handleAtom(atom: Atom): Promise<void>;
    private calculateBitRate;
    private addTag;
    private addWarning;
    /**
     * Parse data of Meta-item-list-atom (item of 'ilst' atom)
     * @param metaAtom
     * Ref: https://developer.apple.com/library/content/documentation/QuickTime/QTFF/Metadata/Metadata.html#//apple_ref/doc/uid/TP40000939-CH1-SW8
     */
    private parseMetadataItemData;
    private parseValueAtom;
    /**
     * Parse movie header (mvhd) atom
     * @param mvhd mvhd atom
     */
    private parseAtom_mvhd;
    /**
     * Parse media header (mdhd) atom
     * @param mdhd mdhd atom
     */
    private parseAtom_mdhd;
    private parse_mxhd;
    /**
     * Parse sample table atom (stbl) atom
     * @param len
     */
    private parseAtom_stbl;
    private parseAtom_ftyp;
    /**
     * Parse sample description atom
     * @param len
     */
    private parseAtom_stsd;
    /**
     * @param sampleDescription
     * Ref: https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFChap3/qtff3.html#//apple_ref/doc/uid/TP40000939-CH205-128916
     */
    private parseSoundSampleDescription;
}
