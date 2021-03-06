import { BlockHeader } from "../../src";

type BlockHeaderData = {
  hex: string;
  raw: BlockHeader;
};

export const datas: BlockHeaderData[] = [
  {
    hex: "04e0ff2f7b8d134d1e1445a2df1c681374839e87dbf32658de570400000000000000000011ef2eb8d6c4b963eaeb8c1039eb946ab86c39649a9877662d6538fe70c93a2ff875656132260e1715bf98b600",
    raw: {
      version: 805298180,
      prevBlock: "7b8d134d1e1445a2df1c681374839e87dbf32658de5704000000000000000000",
      merkleRoot: "11ef2eb8d6c4b963eaeb8c1039eb946ab86c39649a9877662d6538fe70c93a2f",
      timestamp: 1634039288,
      bits: 386803250,
      nonce: 3063463701,
      txnCount: 0,
    },
  },
  {
    hex: "00006020090f2f21c4b0e45d5bf9a73b2e71feccd44f12015669d84836000000000000009c44857133185f2f42a0fb78507b4805398b168bf698b133a10e35935bc09ad47d886861174443197e10d5dc05",
    raw: {
      version: 543162368,
      prevBlock: "090f2f21c4b0e45d5bf9a73b2e71feccd44f12015669d8483600000000000000",
      merkleRoot: "9c44857133185f2f42a0fb78507b4805398b168bf698b133a10e35935bc09ad4",
      timestamp: 1634240637,
      bits: 423838743,
      nonce: 3704950910,
      txnCount: 5,
    },
  },
  /*
    bitcoin core (getblockheader hex-encoded data) 
    hex: "00006020090f2f21c4b0e45d5bf9a73b2e71feccd44f12015669d84836000000000000009c44857133185f2f42a0fb78507b4805398b168bf698b133a10e35935bc09ad47d886861174443197e10d5dc",
    bitcoin core (getblockheader object):
      "hash": "000000000000003b4a425d9feb8769fb1c0141448657a0ef727ba8c4ec7ef95f",
      "confirmations": 9,
      "height": 2099096,
      "version": 543162368,
      "versionHex": "20600000",
      "merkleroot": "d49ac05b93350ea133b198f68b168b3905487b5078fba0422f5f18337185449c",
      "time": 1634240637,
      "nonce": 3704950910, 
      "bits": "19434417",
      "difficulty": 63849542.04864731,
      "chainwork": "0000000000000000000000000000000000000000000005c24305c85e2938ce07",
      "nTx": 5,
      "previousblockhash": "000000000000003648d8695601124fd4ccfe712e3ba7f95b5de4b0c4212f0f09",
      "nextblockhash": "0000000000000020f48a363f087192d1e922b35ee16c7b9acb04dd414573ca74"
 */
];
