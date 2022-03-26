import { BigNumber } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { TokenPreTimelock__factory, TokenPreTimelock } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";

//desposit tokens in bulk
export function useBulkDepositTokens(tokenPreTimeLockAddress: string, address: string[], amounts: BigNumber[]): any {
  const contract = <TokenPreTimelock>useContract(tokenPreTimeLockAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return contract.bulkDepositTokens(address, amounts).then((result: any) => result);
  };
}

//transfer timelocked tokens
export function useTransferTimeLockedTokensAfterTimePeriod(
  tokenPreTimeLockAddress: string,
  token: string,
  to: string,
  amount: BigNumber,
): any {
  const contract = <TokenPreTimelock>useContract(tokenPreTimeLockAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return contract.transferTimeLockedTokensAfterTimePeriod(token, to, amount).then((result: any) => result);
  };
}

function getTimeStampSet(contract: TokenPreTimelock): () => Promise<boolean> {
  return async (): Promise<boolean> => contract.timestampSet().then((result: boolean) => result);
}

export function useTimestampSet(timelock: string, suspense = false): SWRResponse<boolean, any> {
  const contract = <TokenPreTimelock>useContract(timelock, TokenPreTimelock__factory.abi, true);
  const result: any = useSWR(contract ? [timelock, "timestampset", Boolean] : null, getTimeStampSet(contract), {
    suspense,
  });
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

function getAlreadyWithdrawn(contract: TokenPreTimelock, account: string): () => Promise<BigNumber> {
  return async (): Promise<BigNumber> => contract.alreadyWithdrawn(account).then((result: BigNumber) => result);
}

export function useAlreadyWithdrawn(timelock: string, account: string, suspense = false): SWRResponse<BigNumber, any> {
  const contract = <TokenPreTimelock>useContract(timelock, TokenPreTimelock__factory.abi, true);
  const result: any = useSWR(
    contract ? [timelock, "alreadywithdrawn", DataType.TokenBalance] : null,
    getAlreadyWithdrawn(contract, account),
    {
      suspense,
    },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

function getBalances(contract: TokenPreTimelock, account: string): () => Promise<BigNumber> {
  return async (): Promise<BigNumber> => contract.balances(account).then((result: BigNumber) => result);
}

export function useBalances(timelock: string, account: string, suspense = false): SWRResponse<BigNumber, any> {
  const contract = <TokenPreTimelock>useContract(timelock, TokenPreTimelock__factory.abi, true);
  const result: any = useSWR(
    contract ? [timelock, "balances", DataType.TokenBalance] : null,
    getBalances(contract, account),
    {
      suspense,
    },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

function getInitialTimestamp(contract: TokenPreTimelock): () => Promise<string> {
  return async (): Promise<string> => contract.initialTimestamp().then((result: BigNumber) => result.toString());
}

export function useInitialTimestamp(timelock: string, suspense = false): SWRResponse<BigNumber, any> {
  const contract = <TokenPreTimelock>useContract(timelock, TokenPreTimelock__factory.abi, true);
  const result: any = useSWR(
    contract ? [timelock, "initialtimestamp", DataType.TokenBalance] : null,
    getInitialTimestamp(contract),
    {
      suspense,
    },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

function getTimeperiod(contract: TokenPreTimelock): () => Promise<string> {
  return async (): Promise<string> => contract.timePeriod().then((result: BigNumber) => result.toString());
}

export function useTimeperiod(timelock: string, suspense = false): SWRResponse<BigNumber, any> {
  const contract = <TokenPreTimelock>useContract(timelock, TokenPreTimelock__factory.abi, true);
  const result: any = useSWR(
    contract ? [timelock, "timeperiod", DataType.TokenBalance] : null,
    getTimeperiod(contract),
    {
      suspense,
    },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}
