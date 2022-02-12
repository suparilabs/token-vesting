import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
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
function getTokenAllowance(account: string, contract: Contract): (address: string) => Promise<any> {
  return async (): Promise<any> =>
    contract.allowance("0xDa1d30af457b8386083C66c9Df7A86269bEbFDF8", account).then((result: any) => result.toNumber());
}

export function useTokenAllowance(account: string, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(ERC20_ADDRESS, ERC20__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, DataType.Address] : null,
    getTokenAllowance(account as string, contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

//Approve
function getTxApprove(account: string, amount: number, contract: Contract): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.approve(account, amount).then((result: boolean) => result);
}

export function useTxApprove(account: string, amount: number): any {
  const contract = useContract(ERC20_ADDRESS, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract).approve(account, amount).then((result: boolean) => result);
  };
}
