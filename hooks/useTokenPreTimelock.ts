import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenPreTimelock__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";

//transferring sera tokens to seed round => pre timelock contract
export function useTransferTokenPreTimelockSeed(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].SEED_PRE_TIME_LOCK, amount)
      .then((result: boolean) => result);
  };
}

//transferring sera tokens to seed round => pre timelock contract
export function useTransferTokenPreTimelockPrivate(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK, amount)
      .then((result: boolean) => result);
  };
}
