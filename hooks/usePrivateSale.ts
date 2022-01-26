import useSWR, { SWRResponse } from "swr";
import { ChainId, Token, TokenAmount } from "@uniswap/sdk";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { ADDRESS_ZERO, PRIVATE_SALE_ADDRESS } from "../constants";
import { useContract } from "./useContract";
import { abi as PSABI } from "../artifacts/contracts/PrivateSaleContract.sol/PrivateSaleContract.json";
import { DataType } from "../utils";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

function getVestingSchedulesCount(contract: Contract): (address: string) => Promise<Number> {
  return  async() : Promise<Number> => 
     contract.getVestingSchedulesCount().then((result: Number) => result)
}

export function usePrivateSale(
  address?: string | null,
  suspense = false,
): SWRResponse<Number> {
  const { chainId } = useWeb3React();
  const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);
  
  console.log("pvsale line 25", contract);
  
  const result = useSWR(
    typeof address === "string" && contract
      ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance]
      : null,
    getVestingSchedulesCount(
      contract as Contract
    ),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  console.log("RESULTTTT", JSON.stringify(result));
 return result;
}
