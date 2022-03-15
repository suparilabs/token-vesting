import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenPreSale__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
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

//creating vesting schedule from dashboard page -- bulk
export function useCreateVestingSchedule(
  chainId: number,
  beneficiaries: string[],
  durations: number,
  revocables: boolean[],
  amounts: number[],
): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  for (var _i = 0; _i < beneficiaries.length; _i++) {
    return async () => {
      return (contract as Contract).createVestingSchedule(beneficiaries, durations, 1, revocables, amounts);
    };
  }
}
