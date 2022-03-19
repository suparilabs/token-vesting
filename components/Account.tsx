import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import { addresses, desiredChain } from "../constants";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../utils";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useCallback } from "react";
import { useTokenSymbol } from "../hooks/useTokenSymbol";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React();
  const { isMetaMaskInstalled, startOnboarding, stopOnboarding } = useMetaMaskOnboarding();
  const { data: symbol } = useTokenSymbol(
    chainId !== undefined ? (chainId as number) : desiredChain.chainId,
    chainId !== undefined
      ? addresses[chainId as number].ERC20_TOKEN_ADDRESS
      : addresses[desiredChain.chainId as number].ERC20_TOKEN_ADDRESS,
  );
  const { data: balance } = useTokenBalance(
    chainId !== undefined ? (chainId as number) : desiredChain.chainId,
    account as string,
    null,
  );

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const handleConnect = useCallback(async () => {
    if (window.ethereum?.isMetaMask) {
      if (chainId != desiredChain.chainId) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexlify(desiredChain.chainId) }], // binance testnet chain id (in hexadecimal)
          });
          activate(injected, undefined, true).catch(error => {
            // ignore the error if it's a user rejected request
            if (error instanceof UserRejectedRequestError) {
              setConnecting(false);
            } else {
              setError(error);
            }
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    ...desiredChain,
                    chainId: ethers.utils.hexlify(desiredChain.chainId),
                  },
                ],
              });
              activate(
                injected,
                undefined,
                true,
              ).catch(error => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
                toast.error(`${switchError.code}:${switchError?.message}`, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              });
            } catch (addError: any) {
              setError(addError);
              toast.error(`${switchError.code}:${switchError?.message}`, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            toast.error(`${switchError.code}:${switchError?.message}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    } else {
      return (
        <div>
          <button onClick={startOnboarding}>Install Metamask</button>
        </div>
      );
    }
  }, [chainId, activate, setError, startOnboarding]);

  const ENSName = useENSName(account as string);
  // if (error) {
  //   return null;
  // }
  // else
  if (!triedToEagerConnect) {
    return null;
  }
  // else if ((typeof account !== "string" && account == undefined) || chainId != desiredChain.chainId) {
  //   return (
  //     <div>
  //       {isMetaMaskInstalled ? (
  //         <button className="btn btn-green btn-launch-app" disabled={connecting} onClick={() => handleConnect()}>
  //           Connect
  //           <span>
  //             <i className="bi bi-app-indicator"></i>
  //           </span>
  //         </button>
  //       ) : (
  //         <button onClick={startOnboarding}>Install Metamask</button>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <>
      {(!chainId === undefined || chainId !== desiredChain.chainId) && (
        <>
          {/* <span className="tokenAmt"> */}
          {/* <a
                  {...{
                    href: formatEtherscanLink("Account", [chainId as number, account]),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "tokenAmt",
                  }}
                >
                  {ENSName || `${shortenHex(account, 4)}`} &nbsp;|&nbsp;{" "}
                  {account != undefined &&
                    balance != undefined &&
                    (balance as TokenAmount).toSignificant(4, { groupSeparator: "," })}{" "}
                  {symbol?.toUpperCase()}
                </a> */}
          <div>
            {isMetaMaskInstalled ? (
              <button className="btn btn-green btn-launch-app" disabled={connecting} onClick={() => handleConnect()}>
                Connect
                <span>
                  <i className="bi bi-app-indicator"></i>
                </span>
              </button>
            ) : (
              <button onClick={startOnboarding}>Install Metamask</button>
            )}
          </div>
        </>
      )}
      {typeof account == "string" && account != undefined && (
        <>
          <span className="tokenAmt">
            <a
              {...{
                href: formatEtherscanLink("Account", [chainId as number, account]),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "tokenAmt",
              }}
            >
              {ENSName || `${shortenHex(account, 4)}`} &nbsp;|&nbsp;{" "}
              {account != undefined &&
                balance != undefined &&
                (balance as TokenAmount).toSignificant(4, { groupSeparator: "," })}{" "}
              {symbol?.toUpperCase()}
            </a>
          </span>
        </>
      )}
    </>
  );
};

export default Account;
