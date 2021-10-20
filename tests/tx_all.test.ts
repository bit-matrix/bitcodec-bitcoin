import { buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { TxCodec } from "../src";
import { datas } from "./data/tx_all";

datas.forEach((data, index) => {
  test("tx_all decode index:" + index, () => {
    const result = TxCodec.decode(hex2buffer(data.hex));
    expect(result).toEqual(data.raw);
  });

  test("tx_all encode index:" + index, () => {
    const result = TxCodec.encode(data.raw);
    expect(buffer2hex(result)).toEqual(data.hex);
  });
});
