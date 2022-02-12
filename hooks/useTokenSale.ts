import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { addresses } from "../constants";
import { TokenSale__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";

function getERC20TokenOwner(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.owner().then((result: string) => result);
}

export function useBuyTokensWithBusd(amount: any, chainId: number): any {
  const contract = useContract(addresses[chainId as number].TOKEN_SALE_ADDRESS, TokenSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingBUSD(amount);
  };
}

export function useBuyTokensWithUsdt(amount: any, chainId: number): any {
  const contract = useContract(addresses[chainId as number].TOKEN_SALE_ADDRESS, TokenSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingUSDT(amount);
  };
}

function getVestingContractAddress(_amount: any, contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

//Allowance
function getTokenAllowance(account: string, contract: Contract, chainId: number): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract
      .allowance(account, addresses[chainId as number].TOKEN_SALE_ADDRESS)
      .then((result: string) => result.toString());
}

export function useTokenAllowance(account: string, token: string, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(token, ERC20__factory.abi, true);
  const result: any = useSWR(
    contract ? [chainId, token, DataType.Address] : null,
    getTokenAllowance(account as string, contract as Contract, chainId as number),
    { suspense },
  );
  // useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

function getBUSD(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.BUSD().then((result: string) => result.toString());
}

export function useBUSD(chainId: number, suspense = false): SWRResponse<any, any> {
  // const { chainId } = useWeb3React();
  const contract = useContract(addresses[chainId as number].TOKEN_SALE_ADDRESS, TokenSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "busd", addresses[chainId as number].TOKEN_SALE_ADDRESS, DataType.Address] : null,
    getBUSD(contract as Contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

function getUSDT(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.USDT().then((result: string) => result.toString());
}

export function useUSDT(chainId: number, suspense = false): SWRResponse<any, any> {
  // const { chainId } = useWeb3React();
  const contract = useContract(addresses[chainId as number].TOKEN_SALE_ADDRESS, TokenSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "usdt", addresses[chainId as number].TOKEN_SALE_ADDRESS, DataType.Address] : null,
    getUSDT(contract as Contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

//Approve
function getTxApprove(account: string, amount: number, contract: Contract): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.approve(account, amount).then((result: boolean) => result);
}

export function useTxApprove(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .approve(addresses[chainId as number].TOKEN_SALE_ADDRESS, amount)
      .then((result: boolean) => result);
  };
}
