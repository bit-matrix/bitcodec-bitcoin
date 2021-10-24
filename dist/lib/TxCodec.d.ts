import { IBitcodec } from "@bitmatrix/bitcodec";
import { TxBase, TxSegwit } from "../models/Tx";
declare class TxCodecClass implements IBitcodec<TxBase | TxSegwit> {
    private length;
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (tx?: TxBase | TxSegwit | undefined) => number;
    private isSegwit;
    private isSegwitHex;
    constructor();
    encode: (txObject: TxBase | TxSegwit, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => TxBase | TxSegwit;
}
export declare const TxCodec: TxCodecClass;
export declare const TxArrayCodec: import("@bitmatrix/bitcodec/lib").CVarArray;
export {};
