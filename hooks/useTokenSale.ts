import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract } from "ethers";
import { any } from "hardhat/internal/core/params/argumentTypes";
import useSWR, { SWRResponse } from "swr";
import { TOKEN_SALE_ADDRESS, ERC20_ADDRESS } from "../constants";
import { TokenSale__factory, ERC20__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";

function getERC20TokenOwner(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.owner().then((result: string) => result);
}

export function useBuyTokensWithBusd(amount: any): any {
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingBUSD(amount);
  };
}

export function useBuyTokensWithUsdt(amount: any): any {
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingUSDT(amount);
  };
}

function getVestingContractAddress(_amount: any, contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

//Allowance
function getTokenAllowance(account: string, contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract
      .allowance("0x541dA4c3E9B46b813794239a04130345D8d74FB2", TOKEN_SALE_ADDRESS)
      .then((result: string) => result.toString());
}

export function useTokenAllowance(account: string, token: string, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(token, ERC20__factory.abi, true);
  const result: any = useSWR(
    contract ? [chainId, token, DataType.Address] : null,
    getTokenAllowance(account as string, contract as Contract),
    { suspense },
  );
  // useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

function getBUSD(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.BUSD().then((result: string) => result.toString());
}

export function useBUSD(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, TOKEN_SALE_ADDRESS, DataType.Address] : null,
    getBUSD(contract as Contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

function getUSDT(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.USDT().then((result: string) => result.toString());
}

export function useUSDT(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, TOKEN_SALE_ADDRESS, DataType.Address] : null,
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

export function useTxApprove(token: string, amount: BigNumber): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract).approve(TOKEN_SALE_ADDRESS, amount).then((result: boolean) => result);
  };
}
