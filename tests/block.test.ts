import { buffer2hex, hex2buffer } from "@bitmatrix/bitcodec";
import { Block, BlockCodec } from "../src";
import { datas } from "./data/block";

datas.forEach((data, index) => {
  test("block decode index:" + index, () => {
    const blockBuffer = BlockCodec.decode(hex2buffer(data.hex));
    expect(buffer2hex(blockBuffer) as Block).toEqual(data.raw);
  });

  test("block encode index:" + index, () => {
    const blockHexBuffer = BlockCodec.encode(hex2buffer(data.raw));
    expect(buffer2hex(blockHexBuffer)).toEqual(data.hex);
  });
});
