import { BigNumberish } from "ethers";
import { TokenPreVesting, TokenPreVesting__factory } from "../src/types";
import { useContract } from "./useContract";

//SEED ROUND
//creating vesting schedule from dashboard page -- bulk
export function useCreateBulkVestingSchedule(
  preVestingContractAddress: string,
  beneficiaries: string[],
  durations: BigNumberish[],
  slicePeriodSeconds: BigNumberish[],
  revocables: boolean[],
  amounts: BigNumberish[],
): any {
  const contract = <TokenPreVesting>useContract(preVestingContractAddress, TokenPreVesting__factory.abi, true);
  return async () => {
    return contract["createVestingSchedule(address[],uint256[],uint256[],bool[],uint256[])"](
      beneficiaries,
      durations,
      slicePeriodSeconds,
      revocables,
      amounts,
    );
  };
}
