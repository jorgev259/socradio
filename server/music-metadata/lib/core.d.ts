/// <reference types="node" />
import * as Stream from 'stream';
import { ITokenizer } from 'strtok3/lib/types';
import { IAudioMetadata, INativeTagDict, IOptions, IRandomReader, ITag } from './type';
/**
 * Parse audio from Node Stream.Readable
 * @param {Stream.Readable} stream Stream to read the audio track from
 * @param {string} mimeType Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export declare function parseStream(stream: Stream.Readable, mimeType?: string, options?: IOptions): Promise<IAudioMetadata>;
/**
 * Parse audio from Node Buffer
 * @param {Stream.Readable} buf Buffer holding audio data
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export declare function parseBuffer(buf: Buffer, mimeType?: string, options?: IOptions): Promise<IAudioMetadata>;
/**
 * Parse audio from ITokenizer source
 * @param {ITokenizer} tokenizer Audio source implementing the tokenizer interface
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export declare function parseFromTokenizer(tokenizer: ITokenizer, mimeType?: string, options?: IOptions): Promise<IAudioMetadata>;
/**
 * Create a dictionary ordered by their tag id (key)
 * @param nativeTags list of tags
 * @returns tags indexed by id
 */
export declare function orderTags(nativeTags: ITag[]): INativeTagDict;
/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export declare function ratingToStars(rating: number): number;
export declare function scanAppendingHeaders(randomReader: IRandomReader, options?: IOptions): Promise<void>;
