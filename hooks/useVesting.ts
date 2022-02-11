import useSWR, { SWRResponse } from "swr";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { useContract } from "./useContract";
import { DataType } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { TokenVesting__factory } from "../src/types";

function getVestingSchedulesCountByBenificiary(contract: Contract): (address: string) => Promise<number> {
  return async (address: string): Promise<number> =>
    contract.getVestingSchedulesCountByBeneficiary(address).then((result: any) => result.toNumber());
}

// function createVesting(contract: Contract): (address: string, start: Number, cliff: Number, duration: Number, slicePeriod: Number,
//   revocable: boolean, amount: Number) => Promise<String> {
//   return async (address: String,
//     start: Number, cliff: Number,
//     duration: Number, slicePeriod: Number,
//     revocable: boolean, amount: Number
//     ): Promise<String> =>
//     contract.createVestingSchedule(address, start, cliff, duration, slicePeriod, revocable, amount).then((result: any) => result);
// }

export function useVestingScheduleCountBeneficiary(
  vesting: string,
  address?: string | null,
  suspense = false,
): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(vesting, TokenVesting__factory.abi);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, vesting, DataType.TokenBalance] : null,
    getVestingSchedulesCountByBenificiary(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

// export function useCreateVestingSchedule(address?: string | null, suspense = false): SWRResponse<any, any> {
//   const { chainId } = useWeb3React();
//   const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);
//   console.log("Private sale:", contract);

//   const result: any = useSWR(
//     typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
//     createVesting(contract as Contract),
//     { suspense },
//   );

//   console.log("Heyyllooo",result.data);
//   useKeepSWRDATALiveAsBlocksArrive(result.mutate);
//   return result;
// }
