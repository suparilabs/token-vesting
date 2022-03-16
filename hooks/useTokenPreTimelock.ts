import { BigNumber } from "ethers";
import { TokenPreTimelock__factory, ERC20__factory, TokenPreTimelock } from "../src/types";
import { useContract } from "./useContract";

//desposit tokens in bulk
export function useBulkDepositTokens(tokenPreTimeLockAddress: string, address: string[], amounts: BigNumber[]): any {
  const contract = <TokenPreTimelock>useContract(tokenPreTimeLockAddress, TokenPreTimelock__factory.abi, true);
  return async () => {
    return contract.bulkDepositTokens(address, amounts).then((result: any) => result);
  };
}
