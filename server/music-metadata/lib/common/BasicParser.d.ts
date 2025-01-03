import { ITokenizer } from 'strtok3/lib/types';
import { ITokenParser } from '../ParserFactory';
import { IOptions } from '../type';
import { INativeMetadataCollector } from './MetadataCollector';
export declare abstract class BasicParser implements ITokenParser {
    protected metadata: INativeMetadataCollector;
    protected tokenizer: ITokenizer;
    protected options: IOptions;
    /**
     * Initialize parser with output (metadata), input (tokenizer) & parsing options (options).
     * @param {INativeMetadataCollector} metadata Output
     * @param {ITokenizer} tokenizer Input
     * @param {IOptions} options Parsing options
     */
    init(metadata: INativeMetadataCollector, tokenizer: ITokenizer, options: IOptions): ITokenParser;
    abstract parse(): any;
}
