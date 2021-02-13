import { ITokenizer } from 'strtok3/lib/types';
import * as AtomToken from './AtomToken';
export declare type AtomDataHandler = (atom: Atom) => Promise<void>;
export declare class Atom {
    readonly header: AtomToken.IAtomHeader;
    extended: boolean;
    readonly parent: Atom;
    static readAtom(tokenizer: ITokenizer, dataHandler: AtomDataHandler, parent: Atom): Promise<Atom>;
    readonly children: Atom[];
    readonly atomPath: string;
    readonly dataLen: number;
    constructor(header: AtomToken.IAtomHeader, extended: boolean, parent: Atom);
    readAtoms(tokenizer: ITokenizer, dataHandler: AtomDataHandler, size: number): Promise<void>;
    private readData;
}
