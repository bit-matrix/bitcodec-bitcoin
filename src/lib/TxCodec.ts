import bitcodec, { IBitcodec, buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { toTxSegwit, toTxSegwitBase } from "../converter";
import { TxBase, TxSegwit, TxSegwitBase, TxSegwitBaseParsed } from "../models/Tx";
import { Tx, TxWitnessBase } from "./codecs";
import { WitnessLocktimeCodec } from "./WitnessLocktimeCodec";

class TxCodecClass implements IBitcodec<TxBase | TxSegwit> {
  private length: number;
  encodingLength = (): number => this.length;

  encodeBytes: number;
  decodeBytes: number;

  constructor() {
    this.length = 0;
    this.encodeBytes = 0;
    this.decodeBytes = 0;
  }

  encode = (txObject: TxBase | TxSegwit, buffer?: Buffer, offset = 0): Buffer => {
    const txObjectHex = hex2buffer(txObject);
    let resultBuffer: Buffer = Buffer.alloc(0);

    const standartTx = (txObject as TxSegwit).marker === undefined;
    if (standartTx) {
      resultBuffer = Tx.encode(txObjectHex);
      this.encodeBytes = Tx.encodeBytes;
      this.encodingLength = Tx.encodingLength;
    } else {
      const witnessLocktimeCodec = new WitnessLocktimeCodec(txObject.txIn.length);
      const witnessArray = (txObject as TxSegwit).txIn.map((txi) => txi.witnessScripts);
      const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(
        hex2buffer({ witnessScriptsArray: witnessArray, lockTime: txObject.lockTime } as { witnessScriptsArray: string[][]; lockTime: number })
      );
      const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer) as string;

      const txSegwitBase: TxSegwitBase = toTxSegwitBase(txObject as TxSegwit, witnessLocktimeHex);
      resultBuffer = TxWitnessBase.encode(hex2buffer(txSegwitBase));

      this.encodeBytes = TxWitnessBase.encodeBytes;
      this.encodingLength = TxWitnessBase.encodingLength;
    }

    return resultBuffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): TxBase | TxSegwit => {
    let resultBuffer: any;
    let txBuffer = buffer.slice(offset, end);
    let txHex = buffer2hex(txBuffer);

    const standartTx = txHex.substr(8, 4) !== "0001";
    if (standartTx) {
      resultBuffer = Tx.decode(txBuffer);
      const txBase = buffer2hex(resultBuffer) as TxBase;
      this.decodeBytes = Tx.decodeBytes;
      return txBase;
    } else {
      const txWitnessBaseBuffer = TxWitnessBase.decode(txBuffer);
      const txWitnessBase = buffer2hex(txWitnessBaseBuffer) as TxSegwitBase;

      const witnessLocktimeCodec = new WitnessLocktimeCodec(txWitnessBase.txIn.length);
      const witnessLocktimeDataBuffer: { witnessScriptsArray: string[][]; lockTime: number } = witnessLocktimeCodec.decode(hex2buffer(txWitnessBase.witnessScripts_lockTime));
      const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer) as { witnessScriptsArray: string[][]; lockTime: number };

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
    }
  };
}

export const TxCodec = new TxCodecClass();
export const TxArrayCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxCodec);
