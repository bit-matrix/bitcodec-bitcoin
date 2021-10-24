import bitcodec, { IBitcodec, buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { toTxSegwit, toTxSegwitBase } from "../converter";
import { TxBase, TxSegwit, TxSegwitBase, TxSegwitBaseParsed } from "../models/Tx";
import { Tx, TxWitnessBase } from "./codecs";
import { WitnessLocktimeCodec } from "./WitnessLocktimeCodec";

class TxCodecClass implements IBitcodec<TxBase | TxSegwit> {
  private length: number = 0;

  encodeBytes: number = 0;
  decodeBytes: number = 0;
  encodingLength = (tx?: TxBase | TxSegwit): number => 0;

  private isSegwit = (tx: TxBase | TxSegwit) => (<TxSegwit>tx).marker === 0 && (<TxSegwit>tx).flag === 1;
  private isSegwitHex = (txHex: string) => txHex.substr(8, 4) === "0001";

  constructor() {
    this.encodingLength = (tx?: TxBase | TxSegwit) => {
      if (tx === undefined) throw TypeError("Tx Codec: encodingLength tx is undefined.");
      if (this.isSegwit(tx)) return TxWitnessBase.encodingLength(tx);
      return Tx.encodingLength(tx);
    };
  }

  encode = (txObject: TxBase | TxSegwit, buffer?: Buffer, offset = 0): Buffer => {
    const txObjectHex = hex2buffer(txObject);
    const isTxBase = !this.isSegwit(txObject);

    if (isTxBase) {
      buffer = Tx.encode(txObjectHex, buffer, offset);
      this.encodeBytes = Tx.encodeBytes;
      return buffer;
    }

    // isSegwit
    const witnessLocktimeCodec = new WitnessLocktimeCodec(txObject.txIn.length);
    const witnessArray = (txObject as TxSegwit).txIn.map((txi) => txi.witnessScripts);
    const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(
      hex2buffer({ witnessScriptsArray: witnessArray, lockTime: txObject.lockTime } as { witnessScriptsArray: string[][]; lockTime: number })
    );
    const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer) as string;

    const txSegwitBase: TxSegwitBase = toTxSegwitBase(txObject as TxSegwit, witnessLocktimeHex);
    buffer = TxWitnessBase.encode(hex2buffer(txSegwitBase), buffer, offset);

    this.encodeBytes = TxWitnessBase.encodeBytes;
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): TxBase | TxSegwit => {
    const txHex = buffer2hex(buffer.slice(offset, end));
    const isTxBase = !this.isSegwitHex(txHex);

    if (isTxBase) {
      const objBuffer = Tx.decode(buffer, offset, end);
      const txBase = buffer2hex(objBuffer) as TxBase;
      this.decodeBytes = Tx.decodeBytes;
      return txBase;
    }

    // isSegwit
    const txWitnessBaseBuffer = TxWitnessBase.decode(buffer, offset, end);
    const txWitnessBase = buffer2hex(txWitnessBaseBuffer) as TxSegwitBase;

    const witnessLocktimeCodec = new WitnessLocktimeCodec(txWitnessBase.txIn.length);
    const witnessLocktimeDataBuffer: { witnessScriptsArray: string[][]; lockTime: number } = witnessLocktimeCodec.decode(hex2buffer(txWitnessBase.witnessScripts_lockTime));
    const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer) as { witnessScriptsArray: string[][]; lockTime: number };
    this.decodeBytes = witnessLocktimeCodec.decodeBytes;

    const txSegwitParsed: TxSegwitBaseParsed = {
      version: txWitnessBase.version,
      marker: txWitnessBase.marker,
      flag: txWitnessBase.flag,
      txIn: txWitnessBase.txIn,
      txOut: txWitnessBase.txOut,
      witnessScriptsArray: witnessLocktimeData.witnessScriptsArray,
      lockTime: witnessLocktimeData.lockTime,
    };
    const txSegwit = toTxSegwit(txSegwitParsed);

    return txSegwit;
  };
}

export const TxCodec = new TxCodecClass();
export const TxArrayCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxCodec);
