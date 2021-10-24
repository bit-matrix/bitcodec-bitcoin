import { buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { TxArrayCodec } from "../src";
import { datas } from "./data/tx_segwit_array";

datas.forEach((data, index) => {
  test("tx_segwit_array decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = TxArrayCodec.decode(hex2buffer(txHex));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txRaw);
  });

  test("tx_segwit_array encode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = TxArrayCodec.encode(hex2buffer(txRaw));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txHex);
  });
});
