import { default as TokenBscTestnet } from "./deployments/bsctestnet/Token.json";
import { default as TokenSaleBscTestnet } from "./deployments/bsctestnet/TokenSale.json";
import { default as TokenBsc } from "./deployments/bsc/Token.json";
import { default as TokenSaleBsc } from "./deployments/bsc/TokenSale.json";

export enum QueryParameters {
  INPUT = "input",
  OUTPUT = "output",
  CHAIN = "chain",
}

const TypedTokenBscTestnet = TokenBscTestnet as {
  address: string;
};
const TypedTokenSaleBscTestnet = TokenSaleBscTestnet as { address: string };

const TypedTokenBsc = TokenBsc as {
  address: string;
};
const TypedTokenSaleBsc = TokenSaleBsc as { address: string };

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
// export const ERC20_ADDRESS = TypedToken.address;
// export const TOKEN_SALE_ADDRESS = TypedTokenSale.address;

export const addresses: { [key: number]: { ERC20_TOKEN_ADDRESS: string; TOKEN_SALE_ADDRESS: string } } = {
  97: {
    ERC20_TOKEN_ADDRESS: TypedTokenBscTestnet.address,
    TOKEN_SALE_ADDRESS: TypedTokenSaleBscTestnet.address,
  },
  56: {
    ERC20_TOKEN_ADDRESS: TypedTokenBsc.address,
    TOKEN_SALE_ADDRESS: TypedTokenSaleBsc.address,
  },
};
