import { BlockHeaderBase } from "./BlockHeader";
import { TxBase, TxSegwit } from "./Tx";
export interface Block extends BlockHeaderBase {
    txns: TxBase[] | TxSegwit[];
}
