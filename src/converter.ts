import { TxSegwit, TxSegwitBase, TxSegwitBaseParsed } from "./models/Tx";

export const toTxSegwit = (txSegwitParsed: TxSegwitBaseParsed): TxSegwit => {
  const txSegwit: TxSegwit = {
    version: txSegwitParsed.version,
    marker: txSegwitParsed.marker,
    flag: txSegwitParsed.flag,
    txIn: [],
    txOut: txSegwitParsed.txOut,
    lockTime: txSegwitParsed.lockTime,
  };

  txSegwitParsed.txIn.forEach((input, index) => {
    txSegwit.txIn.push({
      previousOutput: input.previousOutput,
      signatureScript: input.signatureScript,
      witnessScripts: txSegwitParsed.witnessScriptsArray[index],
      sequence: input.sequence,
    });
  });

  return txSegwit;
};

export const toTxSegwitParsed = (txSegwit: TxSegwit): TxSegwitBaseParsed => {
  const txSegwitParsed: TxSegwitBaseParsed = {
    version: txSegwit.version,
    marker: txSegwit.marker,
    flag: txSegwit.flag,
    txIn: [],
    txOut: txSegwit.txOut,
    witnessScriptsArray: [],
    lockTime: txSegwit.lockTime,
  };

  txSegwit.txIn.forEach((input, index) => {
    txSegwitParsed.txIn.push({
      previousOutput: input.previousOutput,
      signatureScript: input.signatureScript,
      sequence: input.sequence,
    });

    txSegwitParsed.witnessScriptsArray.push(input.witnessScripts);
  });

  return txSegwitParsed;
};

export const toTxSegwitBase = (txSegwit: TxSegwit, witnessLocktimeHex: string): TxSegwitBase => {
  const txSegwitBase: TxSegwitBase = {
    version: txSegwit.version,
    marker: txSegwit.marker,
    flag: txSegwit.flag,
    txIn: [],
    txOut: txSegwit.txOut,
    witnessScripts_lockTime: witnessLocktimeHex,
    lockTime: txSegwit.lockTime,
  };

  txSegwit.txIn.forEach((input, index) => {
    txSegwitBase.txIn.push({
      previousOutput: input.previousOutput,
      signatureScript: input.signatureScript,
      sequence: input.sequence,
    });
  });

  return txSegwitBase;
};
