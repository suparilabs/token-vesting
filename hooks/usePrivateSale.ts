import useSWR, { SWRResponse } from "swr";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { getContractAddress } from "../constants";
import { useContract } from "./useContract";
import { DataType } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { PrivateSaleContract__factory } from "../src/types";
import { BigNumber } from "ethers";

function getVestingDetails(contract: Contract, count: number): (address: string) => Promise<any> {
  if (count > 0) {
    return async (address: string): Promise<any> =>
      contract.getLastVestingScheduleForHolder(address).then((result: any) => result.toString());
  }
  return async (): Promise<any> => "";
}

function getVestingScheduleCountByBeneficiary(contract: Contract): (address: string) => Promise<number> {
  return async (address: string): Promise<number> =>
    contract.getVestingSchedulesCountByBeneficiary(address).then((result: BigNumber) => result.toNumber());
}

function releaseTokens(contract: Contract): (vestingSchedule: string[]) => Promise<any> {
  return async (vestingSchedule: string[]): Promise<any> =>
    contract._computeReleasableAmount(vestingSchedule).then((result: any) => result.toString());
}

function getTotalAmount(contract: Contract): () => Promise<string> {
  return async (): Promise<string> =>
    contract.getVestingSchedulesTotalAmount().then((result: BigNumber) => result.toString());
}

export function useVestingSchedule(count: number, address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const { PRIVATE_SALE_ADDRESS } = getContractAddress(chainId as number);
  const contract = useContract(PRIVATE_SALE_ADDRESS, PrivateSaleContract__factory.abi);
  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getVestingDetails(contract as Contract, count),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

export function useVestingScheduleCountByBeneficiary(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const { PRIVATE_SALE_ADDRESS } = getContractAddress(chainId as number);
  const contract = useContract(PRIVATE_SALE_ADDRESS, PrivateSaleContract__factory.abi);
  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getVestingScheduleCountByBeneficiary(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

export function useTotalAmount(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const { PRIVATE_SALE_ADDRESS } = getContractAddress(chainId as number);
  const contract = useContract(PRIVATE_SALE_ADDRESS, PrivateSaleContract__factory.abi);
  console.log(address, chainId, PRIVATE_SALE_ADDRESS);
  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getTotalAmount(contract as Contract),
    { suspense },
  );
  console.log("result ", result);
  // useKeepSWRDATALiveAsBlocksArrive(result.mutate);

  return result;
}
// export function useReleaseTokens(address?: string | null, suspense = false): SWRResponse<any, any> {
//   const { chainId } = useWeb3React();

//   const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

//   const result: any = useSWR(
//     typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
//     getVestingDetails(contract as Contract),
//     { suspense },
//   );
//   useKeepSWRDATALiveAsBlocksArrive(result.mutate);
//   console.log("Result:", result.data);

//   return result;
// }
