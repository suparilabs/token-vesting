import useSWR, { SWRResponse } from "swr";
import { ChainId, Token, TokenAmount } from "@uniswap/sdk";
import { Contract } from "ethers";
import { useKeepSWRDATALiveAsBlocksArrive } from "./useKeepSWRDATALiveAsBlocksArrive";
import { ADDRESS_ZERO, ERC20_ADDRESS, PRIVATE_SALE_ADDRESS } from "../constants";
import { useContract } from "./useContract";
import { abi as ERC20ABI } from "../artifacts/contracts/Token.sol/Token.json";
import { DataType } from "../utils";
import { useWeb3React } from "@web3-react/core";

function getTokenBalance(contract: Contract, token: Token): (address: string) => Promise<TokenAmount> {
  return async (address: string): Promise<TokenAmount> =>
    contract
      .balanceOf(address)
      .then((balance: { toString: () => string }) => new TokenAmount(token, balance.toString()));
}

export function useTokenBalance(
  address?: string | null,
  suspense = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): SWRResponse<TokenAmount, any> {
  const { chainId } = useWeb3React();
  const contract = useContract(ERC20_ADDRESS, ERC20ABI);

  console.log("hellooo", contract);

  const result = useSWR(
    typeof address === "string" && contract ? [address, chainId, ERC20_ADDRESS, DataType.TokenBalance] : null,
    getTokenBalance(contract as Contract, new Token(chainId as ChainId, ERC20_ADDRESS, "18")),
    { suspense },
  );
  useKeepSWRDATALiveAsBlocksArrive(result.mutate);
  return result;
}
