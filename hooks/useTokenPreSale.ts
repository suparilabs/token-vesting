import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { Contract } from "ethers";
import useSWR, { SWRResponse } from "swr";
import { DataType } from "../utils";
import { addresses } from "../constants";
import { ERC20__factory, TokenPreSale, TokenPreSale__factory } from "../src/types";
import { useContract } from "./useContract";

export function useStartSale(chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setSaleStatus("1");
  };
}

export function useEndSale(chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).endSale();
  };
}

export function useBuyTokensWithBusd(amount: any, chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingBUSD(amount);
  };
}

export function useBuyTokensWithUsdt(amount: any, chainId: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).buyTokensUsingUSDT(amount);
  };
}

//setting tge value in tokensale
export function useSetAvailableAtTGE(chainId: number, availableAtTGE: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setAvailableAtTGE(availableAtTGE);
  };
}
//setting cliff period in tokensale
export function useSetCliffPeriod(chainId: number, cliff: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setCliff(cliff);
  };
}
//setting duration value in tokensale
export function useSetDuration(chainId: number, duration: number): any {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true);
  return async () => {
    return (contract as Contract).setAvailableAtTGE(duration);
  };
}

function getVestingContractAddress(contract: TokenPreSale): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.vesting().then((result: string) => result.toString());
}

function getTimelockContractAddress(contract: TokenPreSale): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.timelock().then((result: string) => result.toString());
}

export function useVestingContractAddress(chainId: number, suspense = false): SWRResponse<any, any> {
  // const { chainId } = useWeb3React();
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract ? [chainId, "vesting", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getVestingContractAddress(contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

export function useTimeLockContractAddress(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract ? [chainId, "timelock", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getTimelockContractAddress(contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

//Allowance
function getTokenAllowance(account: string, contract: Contract, chainId: number): (address: string) => Promise<string> {
  return async (): Promise<string> =>
    contract
      .allowance(account, addresses[chainId as number].IDO_TOKEN_PRE_SALE)
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
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "busd", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
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
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "usdt", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getUSDT(contract as Contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

function getAvailableAtTGE(contract: Contract): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.availableAtTGE().then((result: string) => result.toString());
}

export function useAvailableAtTGE(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "tge", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getAvailableAtTGE(contract as Contract),
    { suspense },
  );
  //let res: any = BigNumber.from(result.data).toNumber();
  return result;
}

export function useTxApprove(token: string, amount: BigNumber, chainId: number): any {
  const contract = useContract(token, ERC20__factory.abi, true);
  return async () => {
    return (contract as Contract)
      .approve(addresses[chainId as number].IDO_TOKEN_PRE_SALE, amount)
      .then((result: boolean) => result);
  };
}

//DASHBOARD FUNCTIONALITY _ IDO TOKEN PRESALE
function getPreSaleTokenAddress(contract: TokenPreSale): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.token().then((result: string) => result.toString());
}

export function useTokenPreSaleAddress(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract ? [chainId, "tokenPresale", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getPreSaleTokenAddress(contract),
    { suspense },
  );
  return result;
}

//Fetching owner --
export function usePreSaleFetchOwner(
  contractAddress: string,
  chainId: number,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreSale>useContract(contractAddress, TokenPreSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "tokenPreSaleOwner", contractAddress, DataType.Address] : null,
    getOwner(contract),
    { suspense },
  );
  return result;
}

function getOwner(contract: TokenPreSale): (address: string) => Promise<string> {
  return async (): Promise<string> => contract.owner().then((result: string) => result.toString());
}

//Coins Sold
export function usePreSaleCoinsSoldInfo(
  contractAddress: string,
  chainId: number,
  suspense = false,
): SWRResponse<any, any> {
  const contract = <TokenPreSale>useContract(contractAddress, TokenPreSale__factory.abi);
  const result: any = useSWR(
    contract ? [chainId, "tokenPreSaleCoinsSold", contractAddress, DataType.Address] : null,
    getCoinsSold(contract),
    { suspense },
  );
  return result;
}

function getCoinsSold(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.coinsSold().then((result: any) => BigNumber.from(result).toNumber());
}

//Exchange Prices
export function useExchangePriceUsdt(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleExchangePriceUsdt", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getExhangePriceUSDT(contract),
    { suspense },
  );
  return result;
}

function getExhangePriceUSDT(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> =>
    contract.exchangePriceUSDT().then((result: any) => BigNumber.from(result).toNumber());
}

export function useExchangePriceBusd(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleExchangePriceBusd", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getExhangePriceBUSD(contract),
    { suspense },
  );
  return result;
}

function getExhangePriceBUSD(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> =>
    contract.exchangePriceBUSD().then((result: any) => BigNumber.from(result).toNumber());
}

//get duration
export function useDuration(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleDuration", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getDuration(contract),
    { suspense },
  );
  return result;
}

function getDuration(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.duration().then((result: any) => BigNumber.from(result).toNumber());
}
//get cliff
export function useCliff(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract ? [chainId, "tokenPreSaleCliff", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address] : null,
    getCliff(contract),
    { suspense },
  );
  return result;
}

function getCliff(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.cliff().then((result: any) => BigNumber.from(result).toNumber());
}

//get min buy amt
export function useMinBuyAmountUSDT(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleMinUsdt", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getMinBuyAmtUsdt(contract),
    { suspense },
  );
  return result;
}
export function useMaxBuyAmountUSDT(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleMaxUsdt", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getMaxBuyAmtUsdt(contract),
    { suspense },
  );
  return result;
}
export function useMinBuyAmountBusd(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleMinBusd", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getMinBuyAmtBusd(contract),
    { suspense },
  );
  return result;
}

export function useMaxBuyAmountBusd(chainId: number, suspense = false): SWRResponse<any, any> {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi)
  );
  const result: any = useSWR(
    contract
      ? [chainId, "tokenPreSaleMaxBusd", addresses[chainId as number].IDO_TOKEN_PRE_SALE, DataType.Address]
      : null,
    getMaxBuyAmtBusd(contract),
    { suspense },
  );
  return result;
}

function getMinBuyAmtUsdt(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.minBuyAmountUSDT().then((result: any) => BigNumber.from(result).toNumber());
}

function getMaxBuyAmtUsdt(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.maxBuyAmountUSDT().then((result: any) => BigNumber.from(result).toNumber());
}

function getMinBuyAmtBusd(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.minBuyAmountBUSD().then((result: any) => BigNumber.from(result).toNumber());
}

function getMaxBuyAmtBusd(contract: TokenPreSale): (address: string) => Promise<any> {
  return async (): Promise<any> => contract.maxBuyAmountBUSD().then((result: any) => BigNumber.from(result).toNumber());
}

//setExchangePriceUSDT
export function useSetExchangePriceUsdt(price: number, chainId: number): any {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true)
  );
  return async () => {
    return (contract as Contract).setExchangePriceUSDT(price).then((result: any) => result);
  };
}

//setExchangePriceBUSD
export function useSetExchangePriceBusd(price: number, chainId: number): any {
  const contract = <TokenPreSale>(
    useContract(addresses[chainId as number].IDO_TOKEN_PRE_SALE, TokenPreSale__factory.abi, true)
  );
  return async () => {
    return (contract as Contract).setExchangePriceBUSD(price).then((result: any) => result);
  };
}
