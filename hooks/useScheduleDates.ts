import useSWR, { SWRResponse } from "swr";
import { ChainId, Token, TokenAmount } from "@uniswap/sdk";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { ADDRESS_ZERO, PRIVATE_SALE_ADDRESS } from "../constants";
import { useContract } from "./useContract";
import { abi as PSABI } from "../artifacts/contracts/PrivateSaleContract.sol/PrivateSaleContract.json";
import { DataType } from "../utils";
import { ethers, BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";

function computeStartDate(contract: Contract): (address: string) => Promise<any> {
  return async (address: string): Promise<any> =>
    contract.getLastVestingScheduleForHolder(address).then((result: any) => result);
}
// function computeCliff (contract: Contract): (address: string) => Promise<any> {
//   return async (address: string): Promise<any> => contract.getLastVestingScheduleForHolder(address).then((result: any) => result.cliff.toNumber())
// }
// function computeDuration (contract: Contract): (address: string) => Promise<any> {
//   return async (address: string): Promise<any> => contract.getLastVestingScheduleForHolder(address).then((result: any) => result.duration.toNumber())
// }
export function useStart(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();

  const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    computeStartDate(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  console.log("Result:", result.data);
  let startdate: any = BigNumber.from(result.data[3]).toNumber();
  let cliff: any = BigNumber.from(result.data[2]).toNumber();
  let duration: any = BigNumber.from(result.data[4]).toNumber();
  let startFormat: any = moment.unix(startdate).format("dddd, MMMM Do, YYYY h:mm:ss A");
  let cliffFormat: any = moment.unix(cliff).format("dddd, MMMM Do, YYYY h:mm:ss A");
  let durationFormat: any = moment.unix(duration).format("dddd, MMMM Do, YYYY h:mm:ss A");
  console.log("start date:", startFormat);
  console.log("cliff:", cliffFormat);
  console.log("duration:", durationFormat);

  return result;
}
// export function useDuration (address?: string[] | null, suspense = false): SWRResponse<any, any> {
//   const { chainId } = useWeb3React();

//   const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

//   const result: any = useSWR(
//     typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
//     computeDuration(contract as Contract),
//     { suspense },
//   );
//   useKeepSWRDATALiveAsBlocksArrive(result.mutate);
//   console.log("duration:", result.data);
//   return result;
// }
// export function useCliff (address?: string[] | null, suspense = false): SWRResponse<any, any> {
//   const { chainId } = useWeb3React();

//   const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

//   const result: any = useSWR(
//     typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
//     computeCliff(contract as Contract),
//     { suspense },
//   );
//   useKeepSWRDATALiveAsBlocksArrive(result.mutate);
//   console.log("cliff:", result.data);
//   return result;
// }

// export function useSurveyOwners(surveys: string[], suspense = false): SWRResponse<any, any> {
//   const { chainId } = useWeb3React();

//   let result: any = [];
//   for (const survey of surveys) {
//       const contract = useContract(survey, TrustedSurvey?.abi, true);
//       const owner = useSWR(TrustedSurvey && contract ? [chainId, survey] : null,
//           getSurveyOwner(contract as Contract), {
//           suspense
//       });
//       result.push(owner.data)
//   }

//   // useKeepSWRDATALiveAsBlocksArrive(result.mutate)
//   return result;
// }
