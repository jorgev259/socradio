import { ITokenizer } from 'strtok3/lib/types';
import { IOptions, IRandomReader } from '../type';
import { INativeMetadataCollector } from '../common/MetadataCollector';
import { BasicParser } from '../common/BasicParser';
import { IHeader } from './APEv2Token';
export declare class APEv2Parser extends BasicParser {
    /**
     * Calculate the media file duration
     * @param ah ApeHeader
     * @return {number} duration in seconds
     */
    static calculateDuration(ah: IHeader): number;
    /**
     * @param {INativeMetadataCollector} metadata
     * @param {ITokenizer} tokenizer
     * @param {IOptions} options
     * @returns {Promise<boolean>} True if tags have been found
     */
    static parseTagHeader(metadata: INativeMetadataCollector, tokenizer: ITokenizer, options: IOptions): Promise<void>;
    static findApeFooterOffset(reader: IRandomReader, offset: number): Promise<number>;
    private static parseTagFooter;
    private static parseTags;
    private ape;
    parse(): Promise<void>;
    private parseDescriptorExpansion;
    private parseHeader;
}
