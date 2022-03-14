import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenPreSale__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";

export function useStartSale(chainId: number = 97): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setSaleStatus("1");
  };
}

export function useEndSale(chainId: number = 97): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).endSale();
  };
}
