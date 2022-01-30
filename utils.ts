import { formatUnits } from "@ethersproject/units";

export const CHAIN_ID_NAMES: { [key: number]: string } = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Görli",
  42: "Kovan",
  97: "bsctestnet",
  56: "bsc",
};

export const INFURA_PREFIXES: { [key: number]: string } = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  97: "bsctestnet",
  56: "bsc",
};

export const COIN_SYMBOLS: { [key: number]: string } = {
  1: "ETH",
  3: "ETH",
  4: "ETH",
  5: "ETH",
  42: "ETH",
  97: "BNB",
  56: "BNB",
};

export const parseBalance = (balance: number, decimals = 18, decimalstoDisplay = 3) =>
  Number(formatUnits(balance, decimals)).toFixed(decimalstoDisplay);

export enum DataType {
  BlockNumber,
  ETHBalance,
  Address,
  TokenBalance,
}
