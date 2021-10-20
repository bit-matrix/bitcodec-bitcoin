import { buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { Tx } from "../src/lib/codecs";
import { datas } from "./data/tx_base";

datas.forEach((data, index) => {
  test("tx_base decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = Tx.decode(hex2buffer(txHex));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txRaw);
  });

  test("tx_base encode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = Tx.encode(hex2buffer(txRaw));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txHex);
  });
});
