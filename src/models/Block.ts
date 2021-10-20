import { BlockHeaderBase } from "./BlockHeader";
import { TxBase, TxSegwit } from "./Tx";

// https://en.bitcoin.it/wiki/Protocol_documentation#block
export interface Block extends BlockHeaderBase {
  txns: TxBase[] | TxSegwit[];
}
