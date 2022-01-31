import { default as BscToken } from "./deployments/bsctestnet/Token.json";
import { default as BscPrivateSaleContract } from "./deployments/bsctestnet/PrivateSaleContract.json";
import { default as LocalToken } from "./deployments/localhost/Token.json";
import { default as LocalPrivateSaleContract } from "./deployments/localhost/PrivateSaleContract.json";
import { getAddress } from "@ethersproject/address";

export enum QueryParameters {
  INPUT = "input",
  OUTPUT = "output",
  CHAIN = "chain",
}

export type ContractAddressType = {
  address: string;
};

const TypedLocalToken = LocalToken as ContractAddressType;
const TypedLocalPrivateSaleContract = LocalPrivateSaleContract as ContractAddressType;
const TypedBscToken = BscToken as ContractAddressType;
const TypedBscPrivateSaleContract = BscPrivateSaleContract as ContractAddressType;

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export function getContractAddress(chainId: number): { ERC20_ADDRESS: string; PRIVATE_SALE_ADDRESS: string } {
  switch (chainId) {
    case 31337:
    case 1337: {
      return {
        ERC20_ADDRESS: getAddress(TypedLocalToken.address),
        PRIVATE_SALE_ADDRESS: TypedLocalPrivateSaleContract.address,
      };
    }
    case 97: {
      return {
        ERC20_ADDRESS: getAddress(TypedBscToken.address),
        PRIVATE_SALE_ADDRESS: getAddress(TypedBscPrivateSaleContract.address),
      };
    }
    default: {
      throw Error("chain id not supported");
    }
  }
}
