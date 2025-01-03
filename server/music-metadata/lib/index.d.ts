/// <reference types="node" />
import * as Stream from 'stream';
import * as Core from './core';
import { IAudioMetadata, IOptions } from './type';
export { IAudioMetadata, IOptions, ITag, INativeTagDict, ICommonTagsResult, IFormat, IPicture, IRatio } from './type';
export { parseFromTokenizer } from './core';
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
 * @param {Stream.Readable} stream Audio input stream
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export declare const parseBuffer: typeof Core.parseBuffer;
/**
 * Parse audio from Node file
 * @param {string} filePath Media file to read meta-data from
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export declare function parseFile(filePath: string, options?: IOptions): Promise<IAudioMetadata>;
/**
 * Create a dictionary ordered by their tag id (key)
 * @param {ITag[]} nativeTags list of tags
 * @returns {INativeTagDict} Tags indexed by id
 */
export declare const orderTags: typeof Core.orderTags;
/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export declare const ratingToStars: typeof Core.ratingToStars;
