import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import { desiredChain } from "../constants";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../utils";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React();
  const { isMetaMaskInstalled, startOnboarding, stopOnboarding } = useMetaMaskOnboarding();
  const [ desiredChainId, setDesiredChainId ] = useState<number>();
  const { data: balance } = useTokenBalance(chainId !== undefined ? (chainId as number) : desiredChain.chainId, account as string, null);
  
  
  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account as string);
  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  const handleConnect = async() => {
    setDesiredChainId(desiredChain.chainId); //setting desired chain id
    setConnecting(true);
    await enableMetamask();
    activate(injected, undefined, true).catch(error => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  }

  const enableMetamask = async () => {
    if(window.ethereum?.isMetaMask){
      if(chainId != desiredChainId) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }], // binance testnet chain id (in hexadecimal)
          });
        } catch (switchError:any) {
          // This error code indicates that the chain has not been added to MetaMask.
          console.log("ERROR", switchError);
          console.log("Please Change the Network to Binance");
          if (switchError.code === 4902) {
            try {
              console.log("Adding chain --please wait");
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x61',
                    chainName: 'bsctestnet',
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545', 'https://bsc-dataseed.binance.org/' ] /* ... */,
                  },
                ],
              });
            } catch (addError) {
              console.log("ERROR", addError);
            }
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
  }
  if (typeof account !== "string" && account == undefined || chainId != desiredChainId) {
    return (
      <div>
        { isMetaMaskInstalled ? (
              <button className="btn btn-green btn-launch-app"  disabled={connecting} onClick={() => handleConnect()}>
                Connect 
                <span><i className="bi bi-app-indicator"></i></span>
              </button>

            ) : (
              <button onClick={startOnboarding}>Install Metamask</button>
            )}
      </div>
    );
  }
  

  return (
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
      {ENSName || `${shortenHex(account, 4)}`} &nbsp;|&nbsp; {account != undefined && balance != undefined && (balance as TokenAmount).toSignificant(4, { groupSeparator: "," })} SERA
    </a>
    </span>
    </>
  );
};

export default Account;
