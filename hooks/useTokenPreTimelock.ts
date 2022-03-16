import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenPreTimelock__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";

//transferring sera tokens to seed round => pre timelock contract
export function useTransferTokenPreTimelockSeed(amount: BigNumber, chainId: number): any {
  const token = addresses[chainId as number].ERC20_TOKEN_ADDRESS;
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].SEED_PRE_TIME_LOCK, amount)
      .then((result: any) => result);
  };
}

//transferring sera tokens to seed round => pre timelock contract
export function useTransferTokenPreTimelockPrivate(amount: BigNumber, chainId: number): any {
  const token = addresses[chainId as number].ERC20_TOKEN_ADDRESS;
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].PRIVATE_SALE_PRE_TIME_LOCK, amount)
      .then((result: any) => result);
  };
}

//desposit tokens in bulk
export function useBulkDepositTokensSeed(address: string[], amounts: BigNumber[], chainId: number): any {
  const token = addresses[chainId as number].ERC20_TOKEN_ADDRESS;
  const contract = useContract(token, TokenPreTimelock__factory.abi, true);
  return async () => {
    return (contract as Contract).bulkDepositTokens(address, amounts).then((result: any) => result);
  };
}

//desposit tokens in bulk
export function useBulkDepositTokensPrivate(address: string[], amounts: BigNumber[], chainId: number): any {
  const token = addresses[chainId as number].ERC20_TOKEN_ADDRESS;
  const contract = useContract(token, TokenPreTimelock__factory.abi, true);
  return async () => {
    return (contract as Contract).bulkDepositTokens(address, amounts).then((result: any) => result);
  };
}
