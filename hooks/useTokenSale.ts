import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { any } from "hardhat/internal/core/params/argumentTypes";
import useSWR, { SWRResponse } from "swr";
import { TOKEN_SALE_ADDRESS } from "../constants";
import { TokenSale__factory } from "../src/types";
import { DataType } from "../utils";
import { useContract } from "./useContract";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";

function getERC20TokenContractAddress(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.token().then((result: string) => result);
}

function getBuyTokensUsingBUSD(_amount: any, contract: Contract): (address: string) => Promise<string> {
  const { account } = useWeb3React();
  console.log(account);
  const tokenNumber = contract.computeTokensForBUSD(_amount);
  // const provider = contract.providers;
  // const signer = provider.getSigner(); // no arg so using accounts[0]

  // console.log(provider, signer) // all good

  // const tx = { ... }

  // await signer.sendTransaction(tx)
  return async (): Promise<any> => {
    contract
      .saleStatus()
      .then(contract.buyTokensUsingBUSD(_amount, { from: account }).then((result: string) => result));
  };
}

function getVestingContractAddress(_amount: any, contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result);
}

function getAllowance(contract: Contract): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.cliff.then((result: any) => result);
}

export function useVestingContractAddress(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);

  const result: any = useSWR(
    contract ? [chainId, DataType.Address] : null,
    getBuyTokensUsingBUSD(10, contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

export function useTokenContractAddress(suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);

  const result: any = useSWR(
    contract ? [chainId, DataType.Address] : null,
    getERC20TokenContractAddress(contract as Contract),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

export function useTokenSaleContract(vesting, _busdAmount, suspense = false): SWRResponse<any, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(TOKEN_SALE_ADDRESS, TokenSale__factory.abi);
  console.log("hey there", contract);

  const result: any = useSWR(contract ? [chainId, DataType.Address] : null, getAllowance(contract as Contract), {
    suspense,
  });
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  console.log("heyyyy", result.data);
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}
