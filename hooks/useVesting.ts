import useSWR, { SWRResponse } from "swr";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { useContract } from "./useContract";
import { TokenSale__factory } from "../src/types";
import { DataType } from "../utils";
import { useWeb3React } from "@web3-react/core";
import { TOKEN_SALE_ADDRESS, ERC20_ADDRESS } from "../constants";
import { Vesting__factory, ERC20__factory } from "../src/types";

function getVestingSchedulesCountByBenificiary(contract: Contract): (address: string) => Promise<number> {
  return async (address: string): Promise<number> =>
    contract.getVestingSchedulesCountByBeneficiary(address).then((result: any) => result.toNumber());
}
//sera to be unlocked
function getVestingAddress(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

function getUnlockedTokens(contract: Contract): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.totalSupply().then((result: any) => result.toNumber());
}

export function useSeraUnlocked(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(ERC20_ADDRESS, ERC20__factory.abi, true);
  const result: any = useSWR(
    contract ? [chainId, ERC20_ADDRESS, DataType.Address] : null,
    getUnlockedTokens(contract as Contract),
    { suspense },
  );
  return result;
}

export function useVestingScheduleCountBeneficiary(
  vesting: string,
  address?: string | null,
  suspense = false,
): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(vesting, Vesting__factory.abi);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, vesting, DataType.TokenBalance] : null,
    getVestingSchedulesCountByBenificiary(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}
