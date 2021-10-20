import { IBitcodec } from "@bitmatrix/bitcodec";
export declare class WitnessLocktimeCodec implements IBitcodec<{
    witnessScriptsArray: string[][];
    lockTime: number;
}> {
    private witnessLocktimeData;
    private inputsCount;
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (t?: any) => number;
    constructor(inputsCount: number);
    encode: (value: any, buffer?: Buffer | undefined, offset?: number | undefined) => Buffer;
    decode: (buffer: Buffer, offset?: number | undefined, end?: number | undefined) => {
        witnessScriptsArray: string[][];
        lockTime: number;
    };
}
