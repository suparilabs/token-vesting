/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { useVestingScheduleBeneficiary } from "../hooks/useVesting";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { TokenAmount } from "@uniswap/sdk";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const AccountK = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React();
  const { isMetaMaskInstalled, isWeb3Available, startOnboarding, stopOnboarding } = useMetaMaskOnboarding();
  const [connecting, setConnecting] = useState(false);
//   const {data} = useTokenBalance(account,true);
//   const {data: claimable} = useVestingScheduleBeneficiary(account as string);
//   console.log("SERA:", (data as any));
//   console.log("Claimable:", (claimable as any));

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
    <div>
    <div className="text-lg flex flex-wrap justify-end">
        <div className="bg-yellow-500 px-2 py-1">
            <button className="text-black" onClick={(e) => handleClick(e)}>Claim</button>
        </div>
        {/* <h5> SERA to be Unlocked: {(data as TokenAmount).toSignificant(4, { groupSeparator: "," })}</h5> */}
    </div>
    </div>

  );
};

export default AccountK;
