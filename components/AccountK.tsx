/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../utils";
// import Image, { ImageLoader } from "next/image";

type AccountProps = {
  triedToEagerConnect: boolean;
};


const AccountK = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React();

  const { isMetaMaskInstalled, isWeb3Available, startOnboarding, stopOnboarding } = useMetaMaskOnboarding();

  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button
            className="bg-amber-300 px-2 py-1.5 text-black"
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch(error => {
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? (
              <button className="text-xl">
                {/* <Image
                  loader={myLoader as ImageLoader}
                  src="220px-MetaMask_Fox.svg.png"
                  alt="MetaMask"
                  width={25}
                  height={25}
                /> */}
                {/* <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/220px-MetaMask_Fox.svg.png"
                  className=""
                  alt="Connect"
                  width="25px"
                  height="25px"
                />Connect */}
                Connect 
              </button>
            ) : (
              "Connect to Wallet"
            )}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }

  return (
    <div className="text-lg flex flex-wrap justify-end">
        <div className="bg-yellow-500 px-2 py-1">
            <button className="text-black">Claim</button>
        </div>
    </div>

  );
};

export default AccountK;
