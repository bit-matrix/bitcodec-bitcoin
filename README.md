### Tx Decode Hex Data

```js
import btc from "./bitcoin";

const tx = btc.TxCodec.decode(
  "01000000000101d553fbabaf1b26977b6e5d403af9f4b567b3e28484321a6fb02e2824984e3e5000000000171600142b2296c588ec413cebd19c3cbc04ea830ead6e78ffffffff01be1611020000000017a91487e4e5a7ff7bf78b8a8972a49381c8a673917f3e870247304402205f39ccbab38b644acea0776d18cb63ce3e37428cbac06dc23b59c61607aef69102206b8610827e9cb853ea0ba38983662034bd3575cc1ab118fb66d6a98066fa0bed01210304c01563d46e38264283b99bb352b46e69bf132431f102d4bd9a9d8dab075e7f00000000"
);
console.log(tx);

/*
{
      version: 1,
      marker: 0,
      flag: 1,
      txIn: [
        {
          previousOutput: {
            hash: "d553fbabaf1b26977b6e5d403af9f4b567b3e28484321a6fb02e2824984e3e50",
            index: 0,
          },
          signatureScript: "1600142b2296c588ec413cebd19c3cbc04ea830ead6e78",
          witnessScripts: [
            "304402205f39ccbab38b644acea0776d18cb63ce3e37428cbac06dc23b59c61607aef69102206b8610827e9cb853ea0ba38983662034bd3575cc1ab118fb66d6a98066fa0bed01",
            "0304c01563d46e38264283b99bb352b46e69bf132431f102d4bd9a9d8dab075e7f",
          ],
          sequence: 4294967295,
        },
      ],
      txOut: [
        {
          value: 34674366,
          pkScript: "a91487e4e5a7ff7bf78b8a8972a49381c8a673917f3e87",
        },
      ],
      lockTime: 0,
    }*/
```

### Tx Encode Data

```js
import btc from "./bitcoin";

const txData = {
  version: 1,
  marker: 0,
  flag: 1,
  txIn: [
    {
      previousOutput: {
        hash: "d553fbabaf1b26977b6e5d403af9f4b567b3e28484321a6fb02e2824984e3e50",
        index: 0,
      },
      signatureScript: "1600142b2296c588ec413cebd19c3cbc04ea830ead6e78",
      witnessScripts: [
        "304402205f39ccbab38b644acea0776d18cb63ce3e37428cbac06dc23b59c61607aef69102206b8610827e9cb853ea0ba38983662034bd3575cc1ab118fb66d6a98066fa0bed01",
        "0304c01563d46e38264283b99bb352b46e69bf132431f102d4bd9a9d8dab075e7f",
      ],
      sequence: 4294967295,
    },
  ],
  txOut: [
    {
      value: 34674366,
      pkScript: "a91487e4e5a7ff7bf78b8a8972a49381c8a673917f3e87",
    },
  ],
  lockTime: 0,
};

const txHex = btc.TxCodec.encode(txData);
console.log(txHex);

// 01000000000101d553fbabaf1b26977b6e5d403af9f4b567b3e28484321a6fb02e2824984e3e5000000000171600142b2296c588ec413cebd19c3cbc04ea830ead6e78ffffffff01be1611020000000017a91487e4e5a7ff7bf78b8a8972a49381c8a673917f3e870247304402205f39ccbab38b644acea0776d18cb63ce3e37428cbac06dc23b59c61607aef69102206b8610827e9cb853ea0ba38983662034bd3575cc1ab118fb66d6a98066fa0bed01210304c01563d46e38264283b99bb352b46e69bf132431f102d4bd9a9d8dab075e7f00000000
```

## License

MIT

**Free Software, Hell Yeah!**
