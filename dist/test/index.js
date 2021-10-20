// tx
tx_datas.forEach((data) => {
  // encode
  const obj = bitcodec.TxCodec.decode(data.hex);
  if (JSON.stringify(obj) !== JSON.stringify(data.raw)) console.error("tx decode error");

  // decode
  const hex = bitcodec.TxCodec.encode(data.raw);
  if (hex !== data.hex) console.error("tx encode error");
});

// block header
block_header_datas.forEach((data) => {
  // encode
  const obj = bitcodec.helper.buffer2hex(bitcodec.BlockHeaderCodec.decode(bitcodec.helper.hex2buffer(data.hex)));
  if (JSON.stringify(obj) !== JSON.stringify(data.raw)) console.error("block header decode error");

  // decode
  const hex = bitcodec.helper.buffer2hex(bitcodec.BlockHeaderCodec.encode(bitcodec.helper.hex2buffer(data.raw)));
  if (hex !== data.hex) console.error("block header encode error");
});
