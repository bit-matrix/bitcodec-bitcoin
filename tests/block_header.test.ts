import { BlockHeader, BlockHeaderCodec, buffer2hex, hex2buffer } from "../src";
import { datas } from "./data/block_header";

datas.forEach((data, index) => {
  test("block_header decode index:" + index, () => {
    const blockHeaderBuffer = BlockHeaderCodec.decode(hex2buffer(data.hex));
    expect(buffer2hex(blockHeaderBuffer) as BlockHeader).toEqual(data.raw);
  });

  test("block_header encode index:" + index, () => {
    const blockHeaderHexBuffer = BlockHeaderCodec.encode(hex2buffer(data.raw));
    expect(buffer2hex(blockHeaderHexBuffer)).toEqual(data.hex);
  });
});
