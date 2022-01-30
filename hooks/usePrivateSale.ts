import useSWR, { SWRResponse } from "swr";
import { Web3Provider } from "@ethersproject/providers";
import { ChainId, Token, TokenAmount } from "@uniswap/sdk";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { ADDRESS_ZERO, PRIVATE_SALE_ADDRESS } from "../constants";
import { useContract } from "./useContract";
import { abi as PSABI } from "../artifacts/contracts/PrivateSaleContract.sol/PrivateSaleContract.json";
import { DataType } from "../utils";
import { ethers, BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";

function getVestingDetails(contract: Contract): (address: string) => Promise<any> {
  return async (address: string): Promise<any> =>
    contract.getLastVestingScheduleForHolder(address).then((result: any) => result.toString());
}

function releaseTokens(contract: Contract): (vestingSchedule: string[]) => Promise<any> {
  return async (vestingSchedule: string[]): Promise<any> =>
    contract._computeReleasableAmount(vestingSchedule).then((result: any) => result.toString());
}

function getTotalAmount(contract: Contract): () => Promise<any> {
  return async (): Promise<any> => contract.getVestingSchedulesTotalAmount().then((result: any) => result.toString());
}

export function useVestingSchedule(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();

  const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getVestingDetails(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}

export function useTotalAmount(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();

  const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getTotalAmount(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
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
