// https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers
export interface BlockHeaderBase {
  version: number;
  prevBlock: string;
  merkleRoot: string;
  timestamp: number;
  bits: number;
  nonce: number;
}

export interface BlockHeader extends BlockHeaderBase {
  txnCount: number;
}
