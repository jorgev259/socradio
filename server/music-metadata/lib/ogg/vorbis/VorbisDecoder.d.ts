/// <reference types="node" />
export declare class VorbisDecoder {
    private readonly data;
    private offset;
    constructor(data: Buffer, offset: any);
    readInt32(): number;
    readStringUtf8(): string;
    parseUserComment(): {
        key: string;
        value: string;
        len: number;
    };
}
