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

function getVestingSchedulesCount(contract: Contract): (address: string) => Promise<Number> {
  return async (): Promise<Number> => contract.getVestingSchedulesCount().then((result: Number) => result.toNumber());
}

export function usePrivateSale(address?: string | null, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(PRIVATE_SALE_ADDRESS, PSABI);

  const result: any = useSWR(
    typeof address === "string" && contract ? [address, chainId, PRIVATE_SALE_ADDRESS, DataType.TokenBalance] : null,
    getVestingSchedulesCount(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  // let res: any = BigNumber.from(result.data).toNumber();
  return result;
}
