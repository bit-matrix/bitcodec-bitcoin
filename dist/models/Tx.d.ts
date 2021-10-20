export interface TxBase {
    version: number;
    txIn: {
        previousOutput: {
            hash: string;
            index: number;
        };
        signatureScript: string;
        sequence: number;
    }[];
    txOut: {
        value: number;
        pkScript: string;
    }[];
    lockTime: number;
}
export interface TxSegwit {
    version: number;
    marker: number;
    flag: number;
    txIn: {
        previousOutput: {
            hash: string;
            index: number;
        };
        signatureScript: string;
        witnessScripts: string[];
        sequence: number;
    }[];
    txOut: {
        value: number;
        pkScript: string;
    }[];
    lockTime: number;
}
export interface TxSegwitBase extends TxBase {
    marker: number;
    flag: number;
    witnessScripts_lockTime: string;
}
export interface TxSegwitBaseParsed extends TxBase {
    marker: number;
    flag: number;
    witnessScriptsArray: string[][];
}
