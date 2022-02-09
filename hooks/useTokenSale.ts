import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { TOKEN_SALE_ADDRESS } from "../constants";
import { TokenSale__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";

function getVestingContractAddress(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

export function useVestingContractAddress(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);

  const result: any = useSWR(
    contract ? [chainId, DataType.Address] : null,
    getVestingContractAddress(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}
