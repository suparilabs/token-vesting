import { default as Token } from "./deployments/bsctestnet/Token.json";
import { default as TokenSale } from "./deployments/bsctestnet/TokenSale.json";

export enum QueryParameters {
  INPUT = "input",
  OUTPUT = "output",
  CHAIN = "chain",
}

const TypedToken = Token as {
  address: string;
};
const TypedTokenSale = TokenSale as { address: string };

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ERC20_ADDRESS = TypedToken.address;
export const TOKEN_SALE_ADDRESS = TypedTokenSale.address;
