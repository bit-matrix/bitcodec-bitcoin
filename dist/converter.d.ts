import { TxSegwit, TxSegwitBase, TxSegwitBaseParsed } from "./models/Tx";
export declare const toTxSegwit: (txSegwitParsed: TxSegwitBaseParsed) => TxSegwit;
export declare const toTxSegwitParsed: (txSegwit: TxSegwit) => TxSegwitBaseParsed;
export declare const toTxSegwitBase: (txSegwit: TxSegwit, witnessLocktimeHex: string) => TxSegwitBase;
