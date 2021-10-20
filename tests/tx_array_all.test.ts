import { buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { TxArrayCodec } from "../src";
import { datas } from "./data/tx_array_all";

datas.forEach((data, index) => {
  test("tx_array_all decode index:" + index, () => {
    const result = TxArrayCodec.decode(hex2buffer(data.hex));

    expect(result).toEqual(data.raw);
  });

  test("tx_array_all encode index:" + index, () => {
    const result = TxArrayCodec.encode(data.raw);

    expect(buffer2hex(result)).toEqual(data.hex);
  });
});
