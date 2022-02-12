import useSWR, { SWRResponse } from "swr";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { useContract } from "./useContract";
import { TokenSale__factory } from "../src/types";
import { DataType } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { TOKEN_SALE_ADDRESS, ERC20_ADDRESS } from "../constants";
import { Vesting__factory, ERC20__factory } from "../src/types";

function getVestingScheduleByBenificiary(
  account: string,
  token: string,
  contract: Contract,
): (address: string) => Promise<number> {
  return async (address: string): Promise<number> =>
    contract.getLastVestingScheduleForHolder(account).then((result: any) => result.amountTotal);
}
//sera to be unlocked
function getVestingAddress(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

export function useVestingScheduleBeneficiary(account: string, token: string, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(token, Vesting__factory.abi, true);
  console.log("vesting contract", contract);
  const result: any = useSWR(
    contract ? [chainId, token, DataType.Address] : null,
    getVestingScheduleByBenificiary(account as string, token as string, contract as Contract),
    { suspense },
  );
  console.log("result:", result);
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}
