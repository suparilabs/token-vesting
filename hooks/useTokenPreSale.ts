import { Contract } from "ethers";
import { addresses } from "../constants";
import { TokenPreSale__factory } from "../src/types";
import { useContract } from "./useContract";

export function useStartSale(chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setSaleStatus("1");
  };
}

export function useEndSale(chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).endSale();
  };
}
