import { BigNumber, BigNumberish } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useSWR, { SWRResponse } from "swr";
import { Contract } from "ethers";
import { TokenPreVesting, TokenPreVesting__factory } from "../src/types";
import { useContract } from "./useContract";
import { DataType } from "../utils";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";

//creating vesting schedule from dashboard page -- bulk
export function useCreateBulkVestingSchedule(
  preVestingContractAddress: string,
  beneficiaries: string[],
  cliffs: string[],
  durations: BigNumberish[],
  slicePeriodSeconds: BigNumberish[],
  revocables: boolean[],
  amounts: BigNumberish[],
  tges: BigNumberish[],
): any {
  const contract = <TokenPreVesting>useContract(preVestingContractAddress, TokenPreVesting__factory.abi, true);
  return async () => {
    return contract["createVestingSchedule(address[],uint256[],uint256[],uint256[],bool[],uint256[],uint256[])"](
      beneficiaries,
      cliffs,
      durations,
      slicePeriodSeconds,
      revocables,
      amounts,
      tges,
    );
  };
}

function getVestingSchedulesCountByBeneficiary(contract: TokenPreVesting): (address: string) => Promise<number> {
  return async (address: string): Promise<number> =>
    contract.getVestingSchedulesCountByBeneficiary(address).then((result: any) => result.toNumber());
}

export function useVestingScheduleCountBeneficiary(
  vesting: string,
  address?: string | null,
  suspense = false,
): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, vesting, DataType.TokenBalance] : null,
    getVestingSchedulesCountByBeneficiary(contract),
    { suspense },
  );
  return result;
}

function getVestingScheduleByAddressAndIndex(
  account: string,
  index: string,
  contract: TokenPreVesting,
): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract
      .getVestingScheduleByAddressAndIndex(account, index)
      .then((result: TokenPreVesting.VestingScheduleStructOutput) => result.toString());
}

export function useVestingScheduleByAddressAndIndex(
  account: string,
  vesting: string,
  index: string,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi, true);
  const result: any = useSWR(
    contract ? [vesting, account, index, "VestingScheduleByAddressAndIndex", DataType.Address] : null,
    getVestingScheduleByAddressAndIndex(account as string, index, contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result && result.data && result.data.split(",");
}

function getComputeVestingScheduleIdForAddressAndIndex(
  account: string,
  index: string,
  contract: TokenPreVesting,
): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract.computeVestingScheduleIdForAddressAndIndex(account, index).then((result: string) => result.toString());
}

export function useComputeVestingScheduleIdForAddressAndIndex(
  account: string,
  vesting: string,
  index: string,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi, true);
  const result: any = useSWR(
    contract ? [vesting, index, account, "getComputeVestingScheduleIdForAddressAndIndex", DataType.Address] : null,
    getComputeVestingScheduleIdForAddressAndIndex(account, index, contract),
    { suspense },
  );
  return result;
}

function getComputeReleasableAmount(
  scheduleId: string,
  contract: TokenPreVesting,
): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract.computeReleasableAmount(scheduleId).then((result: BigNumber) => result.toString());
}

function getTimeStampSet(contract: TokenPreVesting): (address: string) => Promise<boolean> {
  return async (): Promise<boolean> => contract.timestampSet().then((result: boolean) => result);
}

export function useComputeReleasableAmount(
  vesting: string,
  vestingScheduleId: string,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi, true);
  const result: any = useSWR(
    contract ? [vesting, vestingScheduleId, "getComputeReleasableAmount", DataType.Address] : null,
    getComputeReleasableAmount(vestingScheduleId, contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

export function useRelease(vesting: string, scheduleId: string, amount: string): any {
  const contract = useContract(vesting, TokenPreVesting__factory.abi, true);
  return async () => {
    return (contract as Contract).release(scheduleId, amount).then((result: boolean) => result);
  };
}

export function useSetTimeStamp(vesting: string, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi, true);
  const result: any = useSWR(contract ? [vesting, "timestampset", Boolean] : null, getTimeStampSet(contract), {
    suspense,
  });
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

function getStart(contract: TokenPreVesting): () => Promise<string> {
  return async (): Promise<string> => contract.start().then((result: BigNumber) => result.toString());
}

export function useStart(vesting: string, suspense = false): SWRResponse<string, any> {
  const contract = <TokenPreVesting>useContract(vesting, TokenPreVesting__factory.abi, true);
  const result: any = useSWR(contract ? [vesting, "start", Boolean] : null, getStart(contract), {
    suspense,
  });
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}
