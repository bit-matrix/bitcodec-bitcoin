import bitcodec, { IBitcodec, buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";

export class WitnessLocktimeCodec implements IBitcodec<{ witnessScriptsArray: string[][]; lockTime: number }> {
  private witnessLocktimeData = bitcodec.Object([
    ["witnessScriptsArray", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarBuffer(bitcodec.VarUIntBitcoin)))],
    ["lockTime", bitcodec.Number.UInt32LE],
  ]);
  private inputsCount;

  encodeBytes: number;
  decodeBytes: number;
  encodingLength: (t?: any) => number;

  constructor(inputsCount: number) {
    this.inputsCount = inputsCount;
    this.encodeBytes = this.witnessLocktimeData.encodeBytes;
    this.decodeBytes = this.witnessLocktimeData.decodeBytes;
    this.encodingLength = this.witnessLocktimeData.encodingLength;
  }

  encode = (value: any, buffer?: Buffer | undefined, offset?: number | undefined): Buffer => {
    buffer = this.witnessLocktimeData.encode(value, buffer, offset).slice(1);
    this.encodeBytes = this.witnessLocktimeData.encodeBytes;
    return buffer;
  };

  decode = (buffer: Buffer, offset?: number | undefined, end?: number | undefined): { witnessScriptsArray: string[][]; lockTime: number } => {
    const inputCountHex = this.inputsCount.toString(16).padStart(2, "0");
    const bufferHex = buffer2hex(buffer);
    const newBuffer = hex2buffer(inputCountHex + bufferHex);
    const result = this.witnessLocktimeData.decode(newBuffer, offset, end);
    this.decodeBytes = this.witnessLocktimeData.decodeBytes;
    return result as { witnessScriptsArray: string[][]; lockTime: number };
  };
}
