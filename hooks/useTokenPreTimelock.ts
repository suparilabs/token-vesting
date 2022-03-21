import { BigNumber, BigNumberish } from "ethers";
import { TokenPreTimelock__factory, TokenPreTimelock } from "../src/types";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { DataType } from "../utils";
import { addresses } from "../constants";
import { ERC20__factory, TokenPreSale, TokenPreSale__factory } from "../src/types";
import { useContract } from "./useContract";
//desposit tokens in bulk
export function useBulkDepositTokens(tokenPreTimeLockAddress: string, address: string[], amounts: BigNumber[]): any {
  const contract = <TokenPreTimelock>useContract(tokenPreTimeLockAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return contract.bulkDepositTokens(address, amounts).then((result: any) => result);
  };
}

//Fetching owner --
export function usePreTimelockFetchOwner(
  contractAddress: string,
  chainId: number,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "timelockOwner", contractAddress, DataType.Address] : null,
    getOwner(contract),
    { suspense },
  );
  return result;
}

function getOwner(contract: TokenPreTimelock): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.owner().then((result: string) => result.toString());
}

//Fetching token --
export function usePreTimelockToken(contractAddress: string, chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "timelockToken", contractAddress, DataType.Address] : null,
    getToken(contract),
    { suspense },
  );
  return result;
}

function getToken(contract: TokenPreTimelock): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.getToken().then((result: string) => result.toString());
}

// Timestamp
export function useTimestampStatus(contractAddress: string, chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "timelockStatus", contractAddress, DataType.Address] : null,
    getTimestampStatus(contract),
    { suspense },
  );
  return result;
}

function getTimestampStatus(contract: TokenPreTimelock): (address: string) => Promise<boolean> {
  return async (): Promise<boolean> => contract.timestampSet().then((result: any) => result);
}

//Timetamp initial value
export function useTimestampInitialStatus(
  contractAddress: string,
  chainId: number,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "timelockInitialStatus", contractAddress, DataType.Address] : null,
    getTimestampInitialStatus(contract),
    { suspense },
  );
  return result;
}

function getTimestampInitialStatus(contract: TokenPreTimelock): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.initialTimestamp().then((result: any) => BigNumber.from(result).toNumber());
}

// time period
export function useTimeperiodValue(contractAddress: string, chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "timelockPeriod", contractAddress, DataType.Address] : null,
    getTimeperiod(contract),
    { suspense },
  );
  return result;
}

function getTimeperiod(contract: TokenPreTimelock): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.timePeriod().then((result: any) => BigNumber.from(result).toNumber());
}

//setting timeperiod value in setTimestamp function
export function useSetTimestampPreTimelock(contractAddress: string, chainId: number, timePeriod: number): any {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return (contract as Contract).setTimestamp(timePeriod);
  };
}

//transfer ownership
export function useTransferOwnershipTimelock(contractAddress: string, newOwnerAddress: string, chainId: number): any {
  const contract = <TokenPreTimelock>useContract(contractAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return (contract as Contract).transferOwnership(newOwnerAddress);
  };
}
