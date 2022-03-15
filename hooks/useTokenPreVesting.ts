import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenPreVesting__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";

//SEED ROUND
//creating vesting schedule from dashboard page -- bulk
export function useCreateVestingScheduleSeed(
  chainId: number,
  beneficiaries: string[],
  durations: number,
  revocables: boolean[],
  amounts: number[],
): any {
  const contract = useContract(addresses[chainId as number].SEED_PRE_VESTING, TokenPreVesting__factory.abi, true);
  for (var _i = 0; _i < beneficiaries.length; _i++) {
    return async () => {
      return (contract as Contract).createVestingSchedule(beneficiaries, durations, 1, revocables, amounts);
    };
  }
}

//PRIVATE ROUND
//creating vesting schedule from dashboard page -- bulk
export function useCreateVestingSchedulePrivate(
  chainId: number,
  beneficiaries: string[],
  durations: number,
  amounts: number[],
): any {
  const contract = useContract(
    addresses[chainId as number].PRIVATE_SALE_PRE_VESTING,
    TokenPreVesting__factory.abi,
    true,
  );
  for (var _i = 0; _i < beneficiaries.length; _i++) {
    return async () => {
      return (contract as Contract).createVestingSchedule(beneficiaries, durations, 1, "false", amounts);
    };
  }
}

//transferring sera tokens to seed round => pre vesting contract
export function useTransferTokenPreVestingSeed(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].SEED_PRE_VESTING, amount)
      .then((result: boolean) => result);
  };
}

//transferring sera tokens to seed round => private sale contract
export function useTransferTokenPreVestingPrivate(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .transfer(addresses[chainId as number].PRIVATE_SALE_PRE_VESTING, amount)
      .then((result: boolean) => result);
  };
}
