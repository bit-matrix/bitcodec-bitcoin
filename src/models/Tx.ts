// https://en.bitcoin.it/wiki/Protocol_documentation#tx
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
  // segwit
  marker: number;
  // segwit
  flag: number;
  txIn: {
    previousOutput: {
      hash: string;
      index: number;
    };
    signatureScript: string;
    // segwit
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
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScripts_lockTime: string;
}

export interface TxSegwitBaseParsed extends TxBase {
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScriptsArray: string[][];
}
