import bitcodec from "@bitmatrix/bitcodec";
import { TxCodec } from "./TxCodec";

// tx
const txVersion = bitcodec.Number.UInt32LE; // uint32_t
const txInItemPreviousOutput = bitcodec.Object([
  { name: "hash", type: bitcodec.Buffer(32) }, // char[32]
  { name: "index", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const txInItem = bitcodec.Object([
  { name: "previousOutput", type: txInItemPreviousOutput },
  { name: "signatureScript", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) }, // var_int, uchar[]
  { name: "sequence", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const txIn = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txInItem);
const txOutItem = bitcodec.Object([
  { name: "value", type: bitcodec.Number.Int64LE }, // int64_t
  { name: "pkScript", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) }, // var_int, uchar[]
]);
const txOut = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txOutItem);
const txLockTime = bitcodec.Number.UInt32LE; // uint32_t
export const Tx = bitcodec.Object([
  { name: "version", type: txVersion },
  { name: "txIn", type: txIn }, // compactSize uint
  { name: "txOut", type: txOut }, // compactSize uint
  { name: "lockTime", type: txLockTime },
]);
export const TxWitnessBase = bitcodec.Object([
  { name: "version", type: txVersion },
  { name: "marker", type: bitcodec.Byte }, // uint8_t
  { name: "flag", type: bitcodec.Byte }, // uint8_t
  { name: "txIn", type: txIn },
  { name: "txOut", type: txOut },
  { name: "witnessScripts_lockTime", type: bitcodec.AllBuffer },
]);

// block header
export const BlockHeaderCodec = bitcodec.Object([
  ["version", bitcodec.Number.Int32LE], // uint32_t
  ["prevBlock", bitcodec.Buffer(32)], // char[32]
  ["merkleRoot", bitcodec.Buffer(32)], // char[32]
  ["timestamp", bitcodec.Number.UInt32LE], // uint32_t
  ["bits", bitcodec.Number.UInt32LE], // uint32_t
  ["nonce", bitcodec.Number.UInt32LE], // uint32_t
  ["txnCount", bitcodec.VarUIntBitcoin], // var_int - !!!bitcoin core (getblockheader hex-encoded data) doesn't provide this byte(s)!!!
]);
export const BlockHeaderArrayCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, BlockHeaderCodec);

// block
export const BlockCodec = bitcodec.Object([
  ["version", bitcodec.Number.Int32LE],
  ["prevBlock", bitcodec.Buffer(32)],
  ["merkleRoot", bitcodec.Buffer(32)],
  ["timestamp", bitcodec.Number.UInt32LE],
  ["bits", bitcodec.Number.UInt32LE],
  ["nonce", bitcodec.Number.UInt32LE],
  ["txns", bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxCodec)],
]);
