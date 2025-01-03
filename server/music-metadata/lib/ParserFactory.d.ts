import { IOptions, IAudioMetadata, ParserType } from './type';
import { ITokenizer } from 'strtok3/lib/types';
import { INativeMetadataCollector } from './common/MetadataCollector';
export interface ITokenParser {
    /**
     * Initialize parser with output (metadata), input (tokenizer) & parsing options (options).
     * @param {INativeMetadataCollector} metadata Output
     * @param {ITokenizer} tokenizer Input
     * @param {IOptions} options Parsing options
     */
    init(metadata: INativeMetadataCollector, tokenizer: ITokenizer, options: IOptions): ITokenParser;
    /**
     * Parse audio track.
     * Called after init(...).
     * @returns {Promise<void>}
     */
    parse(): Promise<void>;
}
export declare function parseHttpContentType(contentType: string): {
    type: string;
    subtype: string;
    suffix?: string;
    parameters: {
        [id: string]: string;
    };
};
export declare class ParserFactory {
    /**
     *  Parse metadata from tokenizer
     * @param {ITokenizer} tokenizer
     * @param {string} contentType
     * @param {IOptions} opts
     * @returns {Promise<INativeAudioMetadata>}
     */
    static parseOnContentType(tokenizer: ITokenizer, contentType: string, opts: IOptions): Promise<IAudioMetadata>;
    static parse(tokenizer: ITokenizer, parserId: ParserType, opts: IOptions): Promise<IAudioMetadata>;
    /**
     * @param filePath Path, filename or extension to audio file
     * @return Parser sub-module name
     */
    static getParserIdForExtension(filePath: string): ParserType;
    static loadParser(moduleName: ParserType): Promise<ITokenParser>;
    private static _parse;
    private static getExtension;
    /**
     * @param {string} httpContentType HTTP Content-Type, extension, path or filename
     * @returns {string} Parser sub-module name
     */
    private static getParserIdForMimeType;
}
